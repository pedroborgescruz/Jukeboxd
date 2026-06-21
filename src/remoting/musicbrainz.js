import { artistSearchTerm } from "@/lib/artistSlug";

const MB_HEADERS = {
  "User-Agent": "Jukeboxd/1.0.0",
  Accept: "application/json",
};

const MB_REVALIDATE = 86400;
const MB_TIMEOUT_MS = 15000;

async function mbFetch(url, options = {}) {
  try {
    return await fetch(url, {
      method: "GET",
      headers: MB_HEADERS,
      next: { revalidate: MB_REVALIDATE },
      signal: AbortSignal.timeout(MB_TIMEOUT_MS),
      ...options,
    });
  } catch (error) {
    console.error("MusicBrainz request failed:", error);
    return null;
  }
}

export function isMbid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export async function resolveArtistMbid(artistParam) {
  if (isMbid(artistParam)) return artistParam;

  const searchTerm = artistSearchTerm(artistParam);

  const searchUrl = new URL("https://musicbrainz.org/ws/2/artist");
  searchUrl.searchParams.set("query", `artist:"${searchTerm}"`);
  searchUrl.searchParams.set("fmt", "json");
  searchUrl.searchParams.set("limit", "1");

  const res = await mbFetch(searchUrl.toString());
  if (!res?.ok) return null;

  const data = await res.json();
  const firstMatch = data?.artists?.[0];
  return firstMatch?.id ?? null;
}

export async function fetchArtist(artistMbid) {
  const res = await mbFetch(
    `https://musicbrainz.org/ws/2/artist/${artistMbid}?fmt=json&inc=annotation+tags+genres+url-rels`
  );

  if (!res) return null;
  if (res.status === 404) return null;

  if (!res.ok) {
    console.error("MusicBrainz artist fetch failed:", await res.text());
    return null;
  }

  return res.json();
}

export async function fetchRelease(releaseId) {
  const res = await mbFetch(
    `https://musicbrainz.org/ws/2/release/${encodeURIComponent(releaseId)}?fmt=json&inc=artist-credits+labels`
  );

  if (!res) return null;
  if (res.status === 404) return null;

  if (!res.ok) {
    console.error("MusicBrainz release fetch failed:", await res.text());
    return null;
  }

  return res.json();
}

export async function fetchReleaseGroup(releaseGroupId) {
  const res = await mbFetch(
    `https://musicbrainz.org/ws/2/release-group/${encodeURIComponent(releaseGroupId)}?fmt=json&inc=artists`
  );

  if (!res) return null;
  if (res.status === 404) return null;

  if (!res.ok) {
    console.error("MusicBrainz release-group fetch failed:", await res.text());
    return null;
  }

  return res.json();
}

export async function fetchAlbumInfo(albumId) {
  const release = await fetchRelease(albumId);
  if (release) {
    return {
      title: release.title ?? "Unknown title",
      artist: release["artist-credit"]?.[0]?.name ?? "Unknown artist",
      year: release.date?.substring(0, 4) ?? "",
      label: release["label-info"]?.[0]?.label?.name ?? "—",
    };
  }

  const releaseGroup = await fetchReleaseGroup(albumId);
  if (!releaseGroup) return null;

  return {
    title: releaseGroup.title ?? "Unknown title",
    artist: releaseGroup["artist-credit"]?.[0]?.name ?? "Unknown artist",
    year: releaseGroup["first-release-date"]?.substring(0, 4) ?? "",
    label: "—",
  };
}

/**
 * Album / EP discography via release-group browse (1–2 requests vs many release pages).
 */
export async function fetchAlbumAndEpDiscography(artistMbid, maxGroups = 80) {
  const rows = [];
  let offset = 0;
  const limit = 100;

  while (rows.length < maxGroups) {
    const url = new URL("https://musicbrainz.org/ws/2/release-group");
    url.searchParams.set("artist", artistMbid);
    url.searchParams.set("fmt", "json");
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));

    const res = await mbFetch(url.toString());
    if (!res?.ok) break;

    const data = await res.json();
    const batch = data["release-groups"] ?? [];

    for (const rg of batch) {
      const primary = rg["primary-type"];
      if (primary !== "Album" && primary !== "EP") continue;

      rows.push({
        releaseGroupId: rg.id,
        title: rg.title,
        sortDate: rg["first-release-date"] || "9999-12-31",
      });

      if (rows.length >= maxGroups) break;
    }

    if (batch.length < limit) break;
    offset += limit;
  }

  rows.sort((a, b) => (b.sortDate || "").localeCompare(a.sortDate || ""));
  return rows;
}
