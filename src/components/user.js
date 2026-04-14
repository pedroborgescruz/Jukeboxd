export default function User({ name, imageUrl, subtitle = "Artist" }) {
  const initial = name?.trim()?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex gap-4 items-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="w-10 h-10 object-cover border rounded-full border-gray-600"
        />
      ) : (
        <div
          className="w-10 h-10 shrink-0 rounded-full border border-gray-600 bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700"
          aria-hidden
        >
          {initial}
        </div>
      )}
      <div>
        <p className="font-bold text-jukeboxd">{name ?? "Artist"}</p>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
