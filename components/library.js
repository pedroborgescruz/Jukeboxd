'use client';
import Image from 'next/image';
import HalfRating from './rating';

const albums = [
  { src: '/albums/lana.png', alt: 'Lana Del Rey' },
  { src: '/albums/thesecret.png', alt: 'The Secret of Us' },
  { src: '/albums/awaken.jpeg', alt: 'Awaken, My Love!' },
  { src: '/albums/darkside.png', alt: 'Dark Side of the Moon' },
  { src: '/albums/igor.jpeg', alt: 'IGOR' },
];

const ImageRow = () => {
  return (
    <div style={{ backgroundColor: '#19121f' }} 
      className="w-full mt-4 overflow-x-auto py-6 px-4">

      <div className="mt-4 mb-15">
        <h2 style = {{color: "#6600ff"}} className="text-center text-base/7 font-semibold">Make your voice be heard</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Leave a rating or two
        </p>
      </div>

      <div className="mx-auto mb-10 flex gap-6 justify-center w-fit">
        {albums.map((album, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center">
            <Image
              src={album.src}
              alt={album.alt}
              width={200}
              height={200}
              className="rounded-lg object-cover lib-img"
            />
            <div className="mt-4"> {/* This adds spacing between the image and stars */}
              <HalfRating />
            </div>
            <div className="mt-2">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageRow;
