import {
  resolveArtistMbid,
  fetchArtist,
  fetchAlbumAndEpDiscography,
  isMbid,
} from "@/remoting/musicbrainz";
import { coverArtReleaseGroupUrl } from "@/remoting/coverArt";
import { artistSlug } from "@/lib/artistSlug";
import { ARTIST_SLUG_TO_MBID } from "./suggestions";

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

export function buildArtistBio(artist) {
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

export function getArtistSubtitle(artist) {
  return artist.type === "Group" ? "Group" : "Artist";
}

export function buildHeroImages(releaseGroupId) {
  if (!releaseGroupId) {
    return { avatarUrl: null, heroBackgroundUrl: null };
  }

  return {
    avatarUrl: coverArtReleaseGroupUrl(releaseGroupId, "front-250"),
    heroBackgroundUrl: coverArtReleaseGroupUrl(releaseGroupId, "front-500"),
  };
}

export function buildDiscographyItems(discography) {
  return discography.map((item) => ({
    releaseGroupId: item.releaseGroupId,
    title: item.title,
    coverUrl: coverArtReleaseGroupUrl(item.releaseGroupId, "front-250"),
    dateLabel: formatReleaseDate(item.sortDate),
  }));
}

export async function loadArtistProfile(artistParam) {
  let artistMbid = isMbid(artistParam)
    ? artistParam
    : ARTIST_SLUG_TO_MBID[artistParam.toLowerCase()];

  if (!artistMbid) {
    artistMbid = await resolveArtistMbid(artistParam);
  }
  if (!artistMbid) return null;

  const artist = await fetchArtist(artistMbid);
  if (!artist) return null;

  return {
    artistMbid,
    artist,
    bio: buildArtistBio(artist),
    subtitle: getArtistSubtitle(artist),
    canonicalSlug: artistSlug(artist.name),
  };
}

export async function loadArtistDiscography(artistMbid) {
  const discography = await fetchAlbumAndEpDiscography(artistMbid);
  const { avatarUrl, heroBackgroundUrl } = buildHeroImages(
    discography[0]?.releaseGroupId
  );

  return {
    discography,
    avatarUrl,
    heroBackgroundUrl,
    discographyItems: buildDiscographyItems(discography),
  };
}
