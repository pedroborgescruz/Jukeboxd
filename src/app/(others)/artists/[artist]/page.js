import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import User from "@/components/user";
import { loadArtistProfile } from "../utils";
import { isMbid } from "@/remoting/musicbrainz";
import {
  ArtistHeroAndDiscography,
  ArtistDiscographySkeleton,
  ArtistReleaseStats,
  ArtistStatsSkeleton,
} from "./ArtistDiscography";

export const revalidate = 86400;

export default async function ArtistPage({ params }) {
  const { artist: artistSlug } = await params;
  const artistParam = decodeURIComponent(artistSlug || "").trim();

  if (!artistParam || typeof artistParam !== "string") {
    notFound();
  }

  const profile = await loadArtistProfile(artistParam);
  if (!profile) {
    notFound();
  }

  if (isMbid(artistParam) || artistParam !== profile.canonicalSlug) {
    redirect(`/artists/${profile.canonicalSlug}`);
  }

  const { artistMbid, artist, bio, subtitle } = profile;

  return (
    <div className="w-full min-h-screen flex">
      <div className="w-[20%] p-6 overflow-y-auto flex flex-col justify-between shrink-0">
        <div>
          <User name={artist.name} imageUrl={null} subtitle={subtitle} />
          <div className="break-words max-w-full mt-10">
            <p className="text-sm text-jukeboxd whitespace-pre-wrap">{bio}</p>
          </div>
        </div>
        <Suspense fallback={<ArtistStatsSkeleton />}>
          <ArtistReleaseStats artistMbid={artistMbid} />
        </Suspense>
      </div>

      <Suspense fallback={<ArtistDiscographySkeleton />}>
        <ArtistHeroAndDiscography artistMbid={artistMbid} />
      </Suspense>
    </div>
  );
}
