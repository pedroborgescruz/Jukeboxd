import { artistHref } from "@/lib/artistSlug";
import { ARTIST_SUGGESTIONS } from "./suggestions";

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const dynamic = "force-dynamic";

export default function ArtistsPage() {
  const artists = shuffle(ARTIST_SUGGESTIONS).slice(0, 9);

  return (
    <section className="min-h-screen bg-[#14091c] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-black sm:text-4xl">Artists to Explore</h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300">
          A quick set of recommendations picked for discovery. Refresh the page
          to get a different mix.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <a
              key={artist.name}
              href={artistHref(artist.name)}
              className="rounded-xl border border-[#3e2046] bg-[#1c0f28] p-5 transition hover:-translate-y-0.5 hover:border-[#c8ef05] hover:shadow-lg"
            >
              <p className="text-xs uppercase tracking-wide text-[#c8ef05]">
                {artist.genre}
              </p>
              <h2 className="mt-2 text-xl font-bold">{artist.name}</h2>
              <p className="mt-3 text-sm text-gray-300">{artist.reason}</p>
              <p className="mt-4 text-sm font-semibold text-[#c8ef05]">
                Open artist page →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
