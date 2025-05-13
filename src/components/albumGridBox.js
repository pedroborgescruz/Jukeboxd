import React from 'react';

const AlbumGridBox = ({ title, albums }) => {
  if (!albums || albums.length === 0) return null;

  return (
    <div className='p-6'>
      <h3 className='text-xl font-semibold mb-4'>{title}</h3>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4'>
        {albums.map((album, index) => (
          <div
            key={index}
            className='rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'
          >
            <img
              src={album.cover}
              alt={album.title}
              className='w-full h-auto object-cover rounded'
            />
            <p className='mt-2 text-sm text-center text-gray-300'>{album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumGridBox;
