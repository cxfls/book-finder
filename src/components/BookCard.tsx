import { FaStar } from "react-icons/fa";
import { loadFavorites, toggleFavorite } from "../lib/favorites";
import { useState } from "react";

type BookCardProps = {
  id: string | number;
  title: string;
  author: string;
  image: string;
  onClick?: () => void;
};

export default function BookCard({
  id,
  title,
  author,
  image,
  onClick,
}: BookCardProps) {
  const book = { id, title, author, image };

  const [isFavorite, setIsFavorite] = useState(() => {
    return loadFavorites().some((item) => item.id === id);
  });
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-4 cursor-pointer mb-6"
    >
      <img
        src={image}
        alt="이미지"
        className="w-30 hover:scale-105 transition"
      />
      <p className="bg-neutral-100 text-sm w-6 h-6 flex items-center justify-center rounded-full absolute right-5 bottom-14 cursor-pointer">
        <FaStar
          onClick={(e) => {
            e.stopPropagation();
            const updated = toggleFavorite(book);
            setIsFavorite(updated.some((item) => item.id === id));
          }}
          className={`${
            isFavorite ? "text-yellow-300" : "text-neutral-300"
          } transition`}
        />
      </p>
      <div className="flex flex-col items-center h-10 text-center">
        <h2 className="font-bold">{title}</h2>
        <p className="text-sm text-neutral-500">{author}</p>
      </div>
    </div>
  );
}
