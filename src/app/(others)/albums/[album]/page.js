import { notFound } from "next/navigation";
import Feed from "@/components/feed";
import Album from "@/components/albumProfile";
import Input from "@/components/input";
import AlbumActions from "@/components/albumActions";

const MB_HEADERS = {
  "User-Agent": "Jukeboxd/1.0.0",
  Accept: "application/json",
};

export default async function App(props) {
  const { params } = await props;
  const album_id = params.album;

  if (!album_id || typeof album_id !== "string") {
    notFound();
  }

  const info_res = await fetch(
    `https://musicbrainz.org/ws/2/release/${encodeURIComponent(album_id)}?fmt=json&inc=artist-credits+labels`,
    {
      method: "GET",
      cache: "no-store",
      headers: MB_HEADERS,
    }
  );

  if (info_res.status === 404) {
    notFound();
  }

  if (!info_res.ok) {
    console.error(
      "MusicBrainz API info fetch failed:",
      await info_res.text()
    );
    notFound();
  }

  const info = await info_res.json();

  let coverUrl = "";
  try {
    const cover_res = await fetch(
      `https://coverartarchive.org/release/${encodeURIComponent(album_id)}/front`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "User-Agent": "Jukeboxd/1.0.0",
          Accept: "*/*",
        },
      }
    );
    if (cover_res.ok) {
      coverUrl = cover_res.url;
    } else {
      console.error(
        "Cover Art Archive fetch failed:",
        await cover_res.text()
      );
    }
  } catch (error) {
    console.error("Error fetching cover art:", error);
  }

  const album_data = {
    cover: coverUrl,
    title: info.title ?? "Unknown title",
    artist: info["artist-credit"]?.[0]?.name ?? "Unknown artist",
    year: info.date?.substring(0, 4) ?? "",
    label: info["label-info"]?.[0]?.label?.name ?? "—",
  };

  let data = [];
  try {
    const base = process.env.NEXT_PUBLIC_URL;
    if (base) {
      const result = await fetch(`${base}/api/review/all`, {
        method: "POST",
        cache: "no-store",
      });
      if (result.ok) {
        const json = await result.json();
        data = Array.isArray(json) ? json : [];
      }
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }

  return (
    <div className="grid grid-cols-12 gap-4 mb-20">
      <div className="col-span-3">
        <Album
          cover={album_data.cover}
          title={album_data.title}
          artist={album_data.artist}
          year={album_data.year}
          label={album_data.label}
        />
      </div>
      <div className="col-span-3">
        <AlbumActions />
      </div>
      <div className="col-span-6 space-y-4 mt-20">
        <div className="flex flex-col items-center">
          <small className="text-gray-500">POPULAR REVIEWS</small>
        </div>
        <div className="ml-10 space-y-4">
          <Input album_id={album_id} />
          <Feed data={data} />
        </div>
      </div>
    </div>
  );
}
