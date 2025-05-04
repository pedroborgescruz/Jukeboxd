import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import {Tooltip} from "@heroui/react";
import HalfRating from "./rating";

export default function Album() {
    return (
        <div className="h-full py-4">
            <Card className="mt-20 ml-15 flex flex-col items-center">
                <CardBody className="overflow-visible py-2 flex-col items-center">
                {/* Album stats section start */}
                    <div className="flex gap-3">
                        {/* Likes */}
                        <Tooltip 
                        content="Liked" 
                        className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md"
                        placement="top">
                        <div className="flex gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="gray" className="size-4">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                            <small className="text-gray-500">432k</small>
                        </div>
                </Tooltip>

                {/* Saved */}
                <Tooltip 
                content="Saved" 
                className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md"
                placement="top">
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-4">
                            <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                        </svg>
                        <small className="text-gray-500">121k</small>
                    </div>
                </Tooltip>

                {/* Listened */}
                <Tooltip 
                content="Listened" 
                className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md"
                placement="top">
                    <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-4">
                        <path fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <small className="text-gray-500">42k</small>
                    </div>
                </Tooltip>
                </div>

                {/* Album stats section end */}
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl mt-5 mb-5 border border-gray-700"
                    src="https://media.pitchfork.com/photos/65a6ccaa37e7c24b108f0e09/1:1/w_320,c_limit/Adrianne-Lenker-Bright-Future.jpg"
                    width={270}
                />
                </CardBody>

                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">        
                <small className="text-gray-500 mb-1 ">2024</small>
                <p className="text-tiny font-bold uppercase text-jukeboxd">
                    Bright Future</p>
                <h4 className="text-large text-gray-300">
                    by <a className="underline" href="/artist">Adrianne Lenker</a>
                </h4>
                <small className="text-gray-500">Label: 4AD</small>
                </CardHeader>
            </Card>
        </div>
    )
}