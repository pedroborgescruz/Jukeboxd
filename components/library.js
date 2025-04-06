'use client';
import Image from 'next/image';
import DefaultRating from 'ratingTextless';

const albums = [
  { src: '/albums/lana.png', alt: 'Lana Del Rey' },
  { src: '/albums/thesecret.png', alt: 'The Secret of Us' },
  { src: '/albums/awaken.jpeg', alt: 'Awaken, My Love!' },
  { src: '/albums/darkside.png', alt: 'Dark Side of the Moon' },
  { src: '/albums/igor.jpeg', alt: 'IGOR' },
];

const ImageRow = () => {
  return (
    <div className="w-full overflow-x-auto py-6 px-4">
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
            <div className="mt-2">
              <DefaultRating />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageRow;
