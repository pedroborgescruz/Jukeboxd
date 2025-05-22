import Feed from "@/components/feed";
import Album from "@/components/albumProfile";
import Input from "@/components/input";
import AlbumActions from "@/components/albumActions";

export default async function App(props) {
  const { params } = await props;
  const album_id = params.album;
  let info_res, cover_res, info, cover, album_data;

  { /* Fetch album info with MusicBrainz API */ }
  try {
    // Get album info (name, artist, label, release year)
    info_res = await fetch(('https://musicbrainz.org/ws/2/release/' + album_id + '?inc=artist-credits+labels'), {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'User-Agent': 'Jukeboxd/1.0.0',
        'Accept': 'application/json' // Explicitly request JSON
      },
    });

    // Get album cover (front only)
    cover_res = await fetch(('https://coverartarchive.org/release/' + album_id + '/front'), {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'User-Agent': 'Jukeboxd/1.0.0',
        'Accept': '*/*'
      },
    });

    if (!info_res.ok || !cover_res.ok) {    // Something went wrong with req.
      if (!info_res.ok) {
        console.error("MusicBrainz API info fetch failed:", await info_res.text());
      }
      if (!cover_res.ok) {
        console.error("Cover Art Archive fetch failed:", await cover_res.text());
      }
      throw new Error(`HTTP error! Something went wrong with MB API responses.`);
    }

    // Parse album data accordingly.
    info = await info_res.json();     // All the info associated w/ album, in JSON.
    cover = cover_res.url;            // Album cover URL.

    // Combine all relevant info in a dictionary to pass to front components.
    album_data = {
      cover: cover_res.url,
      title: info.title,
      artist: info['artist-credit'][0].name,
      year: info.date.substring(0, 4),
      label: info['label-info'][0].label.name
    };

  } catch (error) {
    console.error('Error fetching album:', error);
  }

  let data = null;

  // Fetch all reviews.
  {/* Note: Will need to write API route handler to fetch reviews for a given 
  // album, not ALL reviews in DB. */}
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_URL + '/api/review/all', {
      method: 'POST',
      cache: 'no-store',
    });
    data = await result.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  return (
    <div className="grid grid-cols-12 gap-4 mb-20">
      {/* First Column */}
      <div className="col-span-3">
        <Album 
          cover={album_data.cover}
          title={album_data.title}
          artist={album_data.artist}
          year={album_data.year}
          label={album_data.label}/>
      </div>
      {/* Second Column */}
      <div className="col-span-3">
        <AlbumActions />
      </div>
      {/* Third Column */}
      <div className="col-span-6 space-y-4 mt-20">
        <div className="flex flex-col items-center">
          <small className="text-gray-500">POPULAR REVIEWS</small>
        </div>
        <div className="ml-10 space-y-4">
          <Input />
          <Feed data={data} />
        </div>
      </div>
    </div>
  );
}
