import { FaStar } from "react-icons/fa";
import { toggleFavorite } from "../lib/favorites";

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
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-4 cursor-pointer mb-4"
    >
      <img
        src={image}
        alt="이미지"
        className="w-30 hover:scale-105 transition"
      />
      <p className="bg-neutral-100 text-xs w-5 h-5 flex items-center justify-center rounded-full absolute right-3 bottom-15 cursor-pointer">
        <FaStar
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(book);
          }}
          className="text-yellow-300"
        />
      </p>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">{title}</h2>
        <p className="text-sm text-neutral-500">{author}</p>
      </div>
    </div>
  );
}
