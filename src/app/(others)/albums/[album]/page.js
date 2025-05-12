import Feed from "@/components/feed";
import Album from "@/components/albumProfile";
import Input from "@/components/input";
import AlbumActions from "@/components/albumActions";

export default async function App() {

  let data = null;

  try {
    const result = await fetch(process.env.NEXT_PUBLIC_URL + '/api/review/all', {
      method: 'POST',
      cache: 'no-store',
    });
    data = await result.json();
    console.log('Fetched reviews:', data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  return (
    <div className="grid grid-cols-12 gap-4 mb-20">
      {/* First Column - 3/12 (1/4) */}
      <div className="col-span-3">
        <Album />
      </div>
      {/* Second Column - 3/12 (1/4) */}
      <div className="col-span-3">
        <AlbumActions />
      </div>
      {/* Third Column - 6/12 (1/2) */}
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
