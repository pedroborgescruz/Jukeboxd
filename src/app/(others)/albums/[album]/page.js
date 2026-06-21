import { notFound } from "next/navigation";
import Feed from "@/components/feed";
import Album from "@/components/albumProfile";
import Input from "@/components/input";
import AlbumActions from "@/components/albumActions";
import { fetchAlbumInfo } from "@/remoting/musicbrainz";
import { fetchReleaseCoverUrl } from "@/remoting/coverArt";
import { getAllReviews } from "@/remoting/reviews";

export const revalidate = 86400;

export default async function App({ params }) {
  const { album: album_id } = await params;

  if (!album_id || typeof album_id !== "string") {
    notFound();
  }

  const [albumInfo, coverUrl, data] = await Promise.all([
    fetchAlbumInfo(album_id),
    fetchReleaseCoverUrl(album_id),
    getAllReviews(),
  ]);

  if (!albumInfo) {
    notFound();
  }

  const album_data = {
    cover: coverUrl,
    title: albumInfo.title,
    artist: albumInfo.artist,
    year: albumInfo.year,
    label: albumInfo.label,
  };

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
