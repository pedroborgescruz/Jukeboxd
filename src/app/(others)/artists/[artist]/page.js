import { notFound } from "next/navigation";
import User from "@/components/user";
import Stats from "@/components/artistStats";
import DiscographySection from "@/components/discographySection";

const MB_HEADERS = {
  "User-Agent": "Jukeboxd/1.0.0",
  Accept: "application/json",
};

function isMbid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

async function resolveArtistMbid(artistParam) {
  if (isMbid(artistParam)) return artistParam;

  const searchUrl = new URL("https://musicbrainz.org/ws/2/artist");
  searchUrl.searchParams.set("query", `artist:"${artistParam}"`);
  searchUrl.searchParams.set("fmt", "json");
  searchUrl.searchParams.set("limit", "1");

  const res = await fetch(searchUrl.toString(), {
    method: "GET",
    cache: "no-store",
    headers: MB_HEADERS,
  });

  if (!res.ok) return null;

  const data = await res.json();
  const firstMatch = data?.artists?.[0];
  return firstMatch?.id ?? null;
}

function formatReleaseDate(isoDate) {
  if (!isoDate) return "";
  const normalized = isoDate.includes("T") ? isoDate : `${isoDate}T12:00:00Z`;
  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function annotationText(annotation) {
  if (annotation == null) return "";
  if (typeof annotation === "string") return annotation.trim();
  if (typeof annotation === "object" && typeof annotation.text === "string") {
    return annotation.text.trim();
  }
  return "";
}

function buildArtistBio(artist) {
  const fromAnnotation = annotationText(artist.annotation);
  if (fromAnnotation) return fromAnnotation;

  const parts = [];
  const typeLabel =
    artist.type === "Group"
      ? "a musical group"
      : artist.type === "Person"
        ? "an artist"
        : "an artist";

  if (artist.name) {
    let line = `${artist.name} is ${typeLabel}`;
    if (artist.area?.name) line += ` from ${artist.area.name}`;
    line += ".";
    parts.push(line);
  }

  if (artist["begin-area"]?.name && artist.type === "Person") {
    parts.push(`Born in ${artist["begin-area"].name}.`);
  }

  const begin = artist["life-span"]?.begin;
  if (begin) {
    parts.push(
      artist["life-span"]?.ended
        ? `Active from ${begin} to ${artist["life-span"].end}.`
        : `Active since ${begin}.`
    );
  }

  if (artist.disambiguation) {
    parts.push(artist.disambiguation);
  }

  const joined = parts.join(" ").trim();
  return joined || "No biography available yet.";
}

function coverArtReleaseGroupUrl(releaseGroupId, size = "front-250") {
  return `https://coverartarchive.org/release-group/${releaseGroupId}/${size}`;
}

/**
 * Official releases (album / EP) keyed by release-group, picking the earliest
 * dated release in each group for a stable link target.
 */
async function fetchAlbumAndEpDiscography(artistMbid, maxGroups = 80) {
  const byReleaseGroup = new Map();
  let offset = 0;
  const limit = 100;
  const maxOffset = 1500;

  while (byReleaseGroup.size < maxGroups && offset <= maxOffset) {
    const url = new URL("https://musicbrainz.org/ws/2/release");
    url.searchParams.set("artist", artistMbid);
    url.searchParams.set("inc", "release-groups");
    url.searchParams.set("status", "official");
    url.searchParams.set("fmt", "json");
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));

    const res = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      headers: MB_HEADERS,
    });

    if (!res.ok) break;

    const data = await res.json();
    const batch = data.releases ?? [];

    for (const release of batch) {
      const rg = release["release-group"];
      if (!rg?.id) continue;

      const primary = rg["primary-type"];
      if (primary !== "Album" && primary !== "EP") continue;

      const sortDate =
        rg["first-release-date"] || release.date || "9999-12-31";
      const prev = byReleaseGroup.get(rg.id);
      const candidateDate = release.date || sortDate;

      if (
        !prev ||
        (candidateDate && candidateDate < (prev.pickDate || "9999-12-31"))
      ) {
        byReleaseGroup.set(rg.id, {
          releaseId: release.id,
          releaseGroupId: rg.id,
          title: rg.title || release.title,
          sortDate,
          pickDate: candidateDate,
        });
      }
    }

    if (batch.length < limit) break;
    offset += limit;
  }

  const rows = [...byReleaseGroup.values()];
  rows.sort((a, b) => (b.sortDate || "").localeCompare(a.sortDate || ""));
  return rows;
}

export default async function ArtistPage(props) {
  const { params } = await props;
  const artistParam = decodeURIComponent(params.artist || "").trim();

  if (!artistParam || typeof artistParam !== "string") {
    notFound();
  }

  const artistMbid = await resolveArtistMbid(artistParam);
  if (!artistMbid) {
    notFound();
  }

  const artistRes = await fetch(
    `https://musicbrainz.org/ws/2/artist/${artistMbid}?fmt=json&inc=annotation+tags+genres+url-rels`,
    { method: "GET", cache: "no-store", headers: MB_HEADERS }
  );

  if (artistRes.status === 404) {
    notFound();
  }

  if (!artistRes.ok) {
    console.error("MusicBrainz artist fetch failed:", await artistRes.text());
    notFound();
  }

  const artist = await artistRes.json();
  const discography = await fetchAlbumAndEpDiscography(artistMbid);

  const heroReleaseGroupId = discography[0]?.releaseGroupId;
  const heroBackgroundUrl = heroReleaseGroupId
    ? coverArtReleaseGroupUrl(heroReleaseGroupId, "front-500")
    : null;

  const avatarUrl = heroReleaseGroupId
    ? coverArtReleaseGroupUrl(heroReleaseGroupId, "front-250")
    : null;

  const bio = buildArtistBio(artist);

  const discographyItems = discography.map((item) => ({
    releaseId: item.releaseId,
    title: item.title,
    coverUrl: coverArtReleaseGroupUrl(item.releaseGroupId, "front-250"),
    dateLabel: formatReleaseDate(item.sortDate),
  }));

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-[20%] p-6 overflow-y-auto flex flex-col justify-between shrink-0">
        <div>
          <User
            name={artist.name}
            imageUrl={avatarUrl}
            subtitle={artist.type === "Group" ? "Group" : "Artist"}
          />
          <div className="break-words max-w-full mt-10">
            <p className="text-sm text-jukeboxd whitespace-pre-wrap">{bio}</p>
          </div>
        </div>
        <Stats releaseCount={discography.length} />
      </div>

      <div
        className="relative w-[60%] min-h-screen bg-cover bg-center bg-no-repeat bg-[#14091c]"
        style={
          heroBackgroundUrl
            ? { backgroundImage: `url(${heroBackgroundUrl})` }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      </div>

      <div className="w-[40%] p-6 bg-white overflow-y-auto shrink-0">
        <div className="flex flex-col gap-6">
          {discography.length === 0 ? (
            <p className="text-sm text-gray-500">
              No albums or EPs found for this artist in MusicBrainz (official
              releases only).
            </p>
          ) : (
            <DiscographySection items={discographyItems} />
          )}
        </div>
      </div>
    </div>
  );
}
