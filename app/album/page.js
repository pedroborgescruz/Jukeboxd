import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import HalfRating from "../../components/rating";
import Progress from "../../components/progress";

export default function App() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {/* First Column */}
      <Card className="py-4 mt-25 flex flex-col items-center">
        <CardBody className="overflow-visible py-2 flex-col items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl mt-5 mb-5"
            src="https://media.pitchfork.com/photos/65a6ccaa37e7c24b108f0e09/1:1/w_320,c_limit/Adrianne-Lenker-Bright-Future.jpg"
            width={270}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <div className="mb-3">
            <HalfRating />
          </div>
          <small className="text-gray-500 mb-1 ">2024</small>
          <p className="text-tiny font-bold uppercase text-jukeboxd">
            Bright Future</p>
          <h4 className="font-semibold text-large text-gray-300">
            by <a target="_blank" href="#">Adrianne Lenker</a>
          </h4>
          <small className="text-gray-500">Label: 4AD</small>
        </CardHeader>
      </Card>
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
