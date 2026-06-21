import { artistSlug } from "@/lib/artistSlug";
import {
  resolveArtistRef,
  fetchArtistProfile,
  fetchArtistDiscography,
} from "@/remoting/catalog";

export { formatReleaseDate } from "@/remoting/catalog";

export async function loadArtistProfile(artistParam) {
  const artistRef = await resolveArtistRef(artistParam);
  if (!artistRef) return null;

  const profile = await fetchArtistProfile(artistRef, artistParam);
  if (!profile) return null;

  return {
    ...profile,
    canonicalSlug: artistSlug(profile.name),
  };
}

export async function loadArtistDiscography(artistRef, param) {
  return fetchArtistDiscography(artistRef, param);
}
