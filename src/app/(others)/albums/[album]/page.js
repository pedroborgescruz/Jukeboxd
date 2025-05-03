import Progress from "../../../../components/progress";
import Album from "../../../../components/albumProfile";

export default function App() {
  return (
    <div className="grid grid-cols-2 gap-1 mb-50">
      {/* First Column */}
      <Album />
      {/* Second column */}
      <div className="space-y-4 mt-30">
        <div className="flex flex-col items-center">
            <small className="text-gray-300">POPULAR REVIEWS</small>
        </div>
        <Progress />
        <Progress />
        <Progress />
        <Progress />
        <Progress />
        <Progress />
        <Progress />
      </div>
    </div>
  );
}
