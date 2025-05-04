"use client";
import Actions from "./actions";
import HalfRating from "./rating";

export default function AlbumActions() {
    return (
        <div className="mt-30 ml-10 mr-10 h-96 border-solid rounded bg-gray-900 
        flex flex-col justify-between py-5">

            <div className="gap-3 flex flex-col items-center">
                <Actions />
            </div>

            <div className="border-t border-gray-700 w-full pt-4 flex flex-col items-center">
                <small className="text-gray-400">Rate</small>
                <HalfRating defaultValue={4.5} />
                <div className="flex gap-1 mt-2 items-center">
                    <small className="text-gray-500 uppercase">Average Rating</small>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <small className="text-gray-500">4.3</small>
                </div>
            </div>

            <div className="border-t border-gray-700 w-full pt-4 flex justify-center items-center">
                <a href="#" className="text-white">Share</a>
            </div>

            <div className="border-t border-gray-700 w-full pt-4 flex justify-center items-center">
                <a href="#" className="text-white">Add to favorites</a>
            </div>

            <div className="border-t border-gray-700 w-full pt-4 flex justify-center items-center">
                <a href="#" className="text-white">Add to mixtape</a>
            </div>
        </div>
    );
}
