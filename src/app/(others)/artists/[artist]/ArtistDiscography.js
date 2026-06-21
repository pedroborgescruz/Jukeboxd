import DiscographySection from "@/components/discographySection";
import Stats from "@/components/artistStats";
import { loadArtistDiscography } from "../utils";

export async function ArtistReleaseStats({ artistMbid }) {
  const { discography } = await loadArtistDiscography(artistMbid);
  return <Stats releaseCount={discography.length} />;
}

export async function ArtistHeroAndDiscography({ artistMbid }) {
  const { discography, heroBackgroundUrl, discographyItems } =
    await loadArtistDiscography(artistMbid);

  return (
    <>
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
    </>
  );
}

export function ArtistDiscographySkeleton() {
  return (
    <>
      <div className="relative w-[60%] min-h-screen bg-[#14091c] animate-pulse" />
      <div className="w-[40%] p-6 bg-white shrink-0">
        <div className="flex flex-col gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function ArtistStatsSkeleton() {
  return (
    <div className="animate-pulse mt-6 space-y-2">
      <div className="h-4 bg-gray-700/40 rounded w-24" />
      <div className="h-8 bg-gray-700/40 rounded w-16" />
    </div>
  );
}
