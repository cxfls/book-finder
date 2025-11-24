import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import type { Book } from "./SearchPage";
import { loadFavorites, toggleFavorite } from "../lib/favorites";

export default function BookDetailPage() {
  const { id } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(() => {
    return loadFavorites().some((item) => item.id === id);
  });

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://dapi.kakao.com/v3/search/book?target=isbn&query=${encodeURIComponent(
            id
          )}&size=1`,
          {
            headers: {
              Authorization: `KakaoAK ${
                import.meta.env.VITE_KAKAO_REST_API_KEY
              }`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("API 요청 실패");
        }

        const data = await res.json();
        const doc = data.documents?.[0];

        if (!doc) {
          setError("책 정보를 찾을 수 없습니다.");
          return;
        }

        const isbn = doc.isbn?.split(" ")[0];

        const mapped: Book = {
          id: isbn || doc.datetime,
          title: doc.title,
          author: doc.authors?.[0] || "저자 정보 없음",
          description: doc.contents || "",
          image:
            doc.thumbnail ||
            "https://via.placeholder.com/128x180.png?text=No+Image",
        };

        setBook(mapped);
      } catch (e) {
        console.error(e);
        setError("책 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-neutral-500">
        불러오는 중입니다...
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-neutral-500">
        <p>{error || "책 정보를 찾을 수 없습니다."}</p>
        <button
          className="mt-4 px-4 py-2 text-sm rounded-lg bg-neutral-900 text-white cursor-pointer"
          onClick={() => navigate(-1)}
        >
          ← 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-3 px-4 flex flex-col gap-6">
      <button
        className="self-start px-3 py-1.5 text-xs rounded-full border text-neutral-600 cursor-pointer group"
        onClick={() => navigate(-1)}
      >
        <span className="inline-block transform transition-transform duration-200 group-hover:-translate-x-0.5 mr-1">
          ←
        </span>
        목록으로 돌아가기
      </button>

      <div className="flex gap-4">
        <img
          src={book.image}
          alt={book.title}
          className="w-40 h-60 object-cover"
        />
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-1 pr-4">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-sm text-neutral-500">저자: {book.author}</p>
          </div>
          <div>
            <button
              className="bg-neutral-100 text-sm w-6 h-6 flex items-center justify-center rounded-full right-3 bottom-15 cursor-pointer"
              onClick={() => {
                const updated = toggleFavorite(book);
                setIsFavorite(updated.some((item) => item.id === book.id));
              }}
            >
              <FaStar
                className={`${
                  isFavorite ? "text-yellow-300" : "text-neutral-300"
                } transition`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">책 소개</h2>
        <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 rounded-xl px-5 py-4">
          {book.description || "설명 정보가 없습니다."}
        </p>
      </div>
    </div>
  );
}
