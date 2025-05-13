import React from "react";
import User from "@/components/user";
import Stats from "@/components/artistStats";

export default function App() {
  const albums = [
    {
      title: "Once A Bunch / Who Can Say",
      date: "November 22, 2024",
      img: "https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2Fcf72b49bd090274dfa7ec295f54b0ee1.1000x1000x1.webp",
    },
    {
      title: "Bright Future",
      date: "March 22, 2024",
      img: "https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2Fd06adbc6768a013665bf3538e16fe193.1000x1000x1.png",
    },
    {
      title: "​i won’t let go of your hand",
      date: "March 11, 2024",
      img: "https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2Ffe2be114e5636a9510d1f4403a9b0351.1000x1000x1.jpg",
    },
    {
      title: "songs",
      date: "October 23, 2020",
      img: "https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2F41f1f6e26f1a50c462a91e38d592d649.1000x1000x1.png",
    },
    {
      title: "instrumentals",
      date: "October 22, 2020",
      img: "https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2Fe22dd2503f3d2e28020d2b7eecd2919c.1000x1000x1.jpg",
    },
    {
      title: "demos",
      date: "October 5, 2018",
      img: "https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2Fea652e27eedd7458909b67ea87a00d34.598x598x1.jpg",
    },
    {
      title: "abysskiss",
      date: "October 5, 2018",
      img: "https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2Fea813421a18bde3bc39b73c110b0ab2c.1000x1000x1.jpg",
    },
    {
      title: "Daytrotter Session",
      date: "July 7, 2014",
      img: "https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F87dca710ba4c2bfb61848c48a72ae5f4.320x320x1.jpg",
    },
  ];

  return (
    <div className="w-full h-screen flex">
      {/* Left - Artist Info */}
      <div className="w-[20%] p-6 overflow-y-auto flex flex-col justify-between">
        <div>
            <User />
            <div className="break-words max-w-full mt-10">
                <p className="text-sm text-jukeboxd">
                Adrianne Lenker (born July 9, 1991) is an American singer-songwriter
                from Plymouth, Minnesota. She is the guitarist and lead vocalist of
                Brooklyn-based indie rock band Big Thief. She has also released four
                solo albums and two EPs with her former husband, Big Thief co-founder
                Buck Meek.
                </p>
            </div>
        </div>
        <Stats />
      </div>

      {/* Middle - Full Height Background Image */}
      <div 
        className="relative w-[60%] bg-cover bg-center bg-no-repeat 
        bg-[url(https://www.clashmusic.com/wp-content/uploads/2023/12/Adrianne-Lenker.jpg)]">
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        
      </div>

      {/* Right Side - Album Grid */}
      <div className="w-[40%] p-6 bg-white overflow-y-auto">
        <div className="flex flex-col gap-6">
          {albums.map((album, index) => (
            <div key={index} className="flex gap-4 items-center">
              <a href="/album">
                <img 
                  src={album.img}
                  className="w-16 h-16 object-cover border border-gray-600 rounded"
                  alt={`${album.title} cover`}
                />
              </a>
              <div>
                <p className="text-primary font-bold text-sm">
                    <a href="/album">{album.title}</a></p>
                <p className="text-gray-500 text-sm">{album.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
