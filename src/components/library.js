'use client';
import Image from 'next/image';
import HalfRating from './rating';

const albums = [
  { src: '/albums/lana.png', alt: 'Lana Del Rey' },
  { src: '/albums/thesecret.png', alt: 'The Secret of Us' },
  { src: '/albums/darkside.png', alt: 'Dark Side of the Moon' },
  { src: '/albums/igor.jpeg', alt: 'IGOR' },
  { src: '/albums/lemonade.webp', alt: 'Lemonade' },
  { src: '/albums/kate.webp', alt: 'Hounds of Love' },
];

const ImageRow = () => {
  return (
    <div className="w-full mt-10 mb-10 bg-[#19121f] py-6 px-4 overflow-x-auto">
      <div className="mb-10 text-center">
        <h2 className="text-base font-semibold accent-jukeboxd text-[#6600ff]">
          Make your voice be heard
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          Leave a rating or two
        </p>
      </div>

      <div className="flex gap-6 md:flex-wrap justify-center items-center w-fit md:w-full">
        {albums.map((album, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center w-[160px] sm:w-[180px] md:w-[200px]"
          >
            <Image
              src={album.src}
              alt={album.alt}
              width={200}
              height={200}
              className="object-cover lib-img"
            />
            <div className="mt-4">
              <HalfRating />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageRow;
