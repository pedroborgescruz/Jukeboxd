import { artistSearchTerm } from "@/lib/artistSlug";
import {
  isMbid,
  resolveArtistMbid,
  fetchArtist as fetchMbArtist,
  fetchAlbumAndEpDiscography,
  fetchAlbumInfo as fetchMbAlbumInfo,
} from "@/remoting/musicbrainz";
import { fetchReleaseCoverUrl } from "@/remoting/coverArt";
import {
  isSpotifyConfigured,
  isSpotifyId,
  searchSpotifyArtist,
  fetchSpotifyArtist,
  fetchSpotifyArtistAlbums,
  fetchSpotifyAlbum,
  buildSpotifyArtistBio,
  getSpotifyArtistSubtitle,
  getSpotifyArtistImage,
} from "@/remoting/spotify";
import {
  ARTIST_SLUG_TO_MBID,
  ARTIST_SLUG_TO_SPOTIFY_ID,
} from "@/app/(others)/artists/suggestions";

/** @typedef {{ id: string, provider: 'spotify' | 'musicbrainz' }} ArtistRef */

export { isSpotifyId, isSpotifyConfigured };

/**
 * Resolve a route param to a catalog artist reference.
 * Prefers Spotify when configured, falls back to MusicBrainz.
 * @returns {Promise<ArtistRef | null>}
 */
export async function resolveArtistRef(param) {
  if (isSpotifyId(param)) {
    return { id: param, provider: "spotify" };
  }

  if (isMbid(param)) {
    return { id: param, provider: "musicbrainz" };
  }

  const slugKey = param.toLowerCase();

  if (isSpotifyConfigured()) {
    const spotifyId = ARTIST_SLUG_TO_SPOTIFY_ID[slugKey];
    if (spotifyId) return { id: spotifyId, provider: "spotify" };

    const spotifyMatch = await searchSpotifyArtist(artistSearchTerm(param));
    if (spotifyMatch) {
      return { id: spotifyMatch.id, provider: "spotify" };
    }
  }

  let mbid = ARTIST_SLUG_TO_MBID[slugKey];
  if (!mbid) {
    mbid = await resolveArtistMbid(param);
  }
  if (!mbid) return null;

  return { id: mbid, provider: "musicbrainz" };
}

async function resolveMusicBrainzRef(param) {
  if (isMbid(param)) {
    return { id: param, provider: "musicbrainz" };
  }

  const slugKey = param.toLowerCase();
  let mbid = ARTIST_SLUG_TO_MBID[slugKey];
  if (!mbid) {
    mbid = await resolveArtistMbid(param);
  }
  if (!mbid) return null;

  return { id: mbid, provider: "musicbrainz" };
}

/**
 * @returns {Promise<{ artistRef: ArtistRef, name: string, bio: string, subtitle: string, imageUrl: string | null } | null>}
 */
export async function fetchArtistProfile(artistRef, param) {
  if (artistRef.provider === "spotify") {
    const artist = await fetchSpotifyArtist(artistRef.id);
    if (artist) {
      return {
        artistRef,
        name: artist.name,
        bio: buildSpotifyArtistBio(artist),
        subtitle: getSpotifyArtistSubtitle(artist),
        imageUrl: getSpotifyArtistImage(artist, 250),
      };
    }

    console.warn("Spotify artist fetch failed, falling back to MusicBrainz");
    const mbRef = await resolveMusicBrainzRef(param);
    if (!mbRef) return null;
    return fetchArtistProfile(mbRef, param);
  }

  const artist = await fetchMbArtist(artistRef.id);
  if (!artist) return null;

  return {
    artistRef,
    name: artist.name,
    bio: buildMbArtistBio(artist),
    subtitle: getMbArtistSubtitle(artist),
    imageUrl: null,
  };
}

/**
 * @returns {Promise<{ discography: Array, avatarUrl: string | null, heroBackgroundUrl: string | null, discographyItems: Array }>}
 */
export async function fetchArtistDiscography(artistRef, param) {
  if (artistRef.provider === "spotify") {
    const [artist, discography] = await Promise.all([
      fetchSpotifyArtist(artistRef.id),
      fetchSpotifyArtistAlbums(artistRef.id),
    ]);

    const heroBackgroundUrl = artist
      ? getSpotifyArtistImage(artist, 640)
      : null;

    if (discography.length > 0) {
      const heroCover = discography[0]?.coverUrl ?? null;

      return {
        discography,
        avatarUrl: heroCover,
        heroBackgroundUrl,
        discographyItems: discography.map((item) => ({
          albumId: item.albumId,
          title: item.title,
          coverUrl: item.coverUrl,
          dateLabel: formatReleaseDate(item.sortDate),
        })),
      };
    }

    console.warn("Spotify discography fetch failed, falling back to MusicBrainz");
    const mbRef = await resolveMusicBrainzRef(param);
    if (!mbRef) {
      return {
        discography: [],
        avatarUrl: null,
        heroBackgroundUrl,
        discographyItems: [],
      };
    }

    const mbDiscography = await fetchArtistDiscography(mbRef, param);
    return {
      ...mbDiscography,
      heroBackgroundUrl: heroBackgroundUrl ?? mbDiscography.heroBackgroundUrl,
    };
  }

  const discography = await fetchAlbumAndEpDiscography(artistRef.id);
  const heroReleaseGroupId = discography[0]?.releaseGroupId;

  return {
    discography,
    avatarUrl: heroReleaseGroupId
      ? `https://coverartarchive.org/release-group/${heroReleaseGroupId}/front-250`
      : null,
    heroBackgroundUrl: heroReleaseGroupId
      ? `https://coverartarchive.org/release-group/${heroReleaseGroupId}/front-500`
      : null,
    discographyItems: discography.map((item) => ({
      albumId: item.releaseGroupId,
      title: item.title,
      coverUrl: `https://coverartarchive.org/release-group/${item.releaseGroupId}/front-250`,
      dateLabel: formatReleaseDate(item.sortDate),
    })),
  };
}

/**
 * @returns {Promise<{ title: string, artist: string, year: string, label: string, coverUrl: string } | null>}
 */
export async function fetchAlbumPageData(albumId) {
  if (isSpotifyConfigured() && isSpotifyId(albumId)) {
    const album = await fetchSpotifyAlbum(albumId);
    if (album) return album;
  }

  const mbInfo = await fetchMbAlbumInfo(albumId);
  if (mbInfo) {
    const coverUrl = (await fetchReleaseCoverUrl(albumId)) || "";
    return { ...mbInfo, coverUrl };
  }

  return null;
}

export function formatReleaseDate(isoDate) {
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

function buildMbArtistBio(artist) {
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

function getMbArtistSubtitle(artist) {
  return artist.type === "Group" ? "Group" : "Artist";
}

export function isOpaqueCatalogId(param) {
  return isMbid(param) || isSpotifyId(param);
}
