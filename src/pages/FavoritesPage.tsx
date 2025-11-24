import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { clearFavorites, loadFavorites } from "../lib/favorites";
import type { FavoriteBook } from "../lib/favorites";
import TopButton from "../components/TopButton";
import { FaTrash } from "react-icons/fa";

export default function FavoritesPage() {
  const favoriteBook: FavoriteBook[] = loadFavorites();
  const navigate = useNavigate();

  const onClickClear = () => {
    if (
      favoriteBook.length > 0 &&
      window.confirm("정말로 모든 즐겨찾기를 삭제하시겠습니까?")
    ) {
      clearFavorites();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-0 flex flex-col gap-2 relative pb-6">
      <div className="relative flex items-center justify-center py-1.5 text-center bg-neutral-100 font-semibold mt-1 mb-3 rounded-3xl">
        <button onClick={() => navigate(-1)}>
          <span className="absolute left-5 bottom-1.5 inline-block transform transition-transform duration-200 hover:-translate-x-0.5 mr-1 cursor-pointer">
            ←
          </span>
        </button>
        <h1>즐겨찾기 목록</h1>
        <button onClick={onClickClear} className="cursor-pointer">
          <FaTrash className="text-sm absolute right-5 bottom-2.5 inline-block transform transition-transform duration-200 cursor-pointer" />
        </button>
      </div>

      {favoriteBook.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {favoriteBook.map((item) => (
            <BookCard
              key={item.id}
              {...item}
              onClick={() => navigate(`/book/${item.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 mt-30">
          <p className="text-2xl font-bold text-neutral-800">
            즐겨찾기가 없습니다 ㅠ.ㅠ
          </p>
          <p
            onClick={() => navigate("/")}
            className="text-sm underline cursor-pointer text-neutral-500"
          >
            즐겨찾기 추가하러 가기!
          </p>
        </div>
      )}
      <TopButton />
    </div>
  );
}
