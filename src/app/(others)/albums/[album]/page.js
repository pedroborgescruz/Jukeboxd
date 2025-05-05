import Progress from "@/components/progress";
import Album from "@/components/albumProfile";
import Input from "@/components/input";
import AlbumActions from "@/components/albumActions";

export default function App() {
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
          <Progress />
          <Progress />
          <Progress />
          <Progress />
          <Progress />
          <Progress />
          <Progress />
        </div>
      </div>
    </div>
  );
}
