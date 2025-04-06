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
    <div className="w-full mt-4 overflow-x-auto py-6 px-4 bg-neutral-950">
      <div className="mx-auto flex gap-6 justify-center w-fit">
        {albums.map((album, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center">
            <Image
              src={album.src}
              alt={album.alt}
              width={200}
              height={200}
              className="rounded-lg object-cover"
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
