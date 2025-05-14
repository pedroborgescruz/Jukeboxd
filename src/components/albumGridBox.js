import React from 'react';

const AlbumGridBox = ({ title = "Albums" }) => {
  const albums = [
    {
      title: "Art Angels",
      date: "November 22, 2024",
      img: "https://upload.wikimedia.org/wikipedia/en/d/d9/Grimes_-_Art_Angels.png",
    },
    {
      title: "Bright Future",
      date: "March 22, 2024",
      img: "https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2Fd06adbc6768a013665bf3538e16fe193.1000x1000x1.png",
    },
    {
      title: "Let's Dance",
      date: "March 11, 2024",
      img: "https://upload.wikimedia.org/wikipedia/en/8/8d/David-bowie-lets-dance.jpg",
    },
    {
      title: "Pop 2",
      date: "October 23, 2020",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Charli_XCX_-_Pop_2.png/250px-Charli_XCX_-_Pop_2.png",
    },
    {
      title: "Gal Costa",
      date: "October 22, 2020",
      img: "https://www.udiscovermusic.com/wp-content/uploads/2022/11/gal-costa-gal-costa-album.jpg",
    },
  ];

    return (
    <div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
        {albums.map((album) => (
            <div
            key={album.title}
            className='rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'
            >
            <div className='aspect-square w-full'>
                <img
                src={album.img}
                alt={album.title}
                className='w-full h-full object-cover rounded border border-gray-700'
                />
            </div>
            </div>
        ))}
        </div>
    </div>
    );

};

export default AlbumGridBox;
