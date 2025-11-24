import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TopButton from "../components/TopButton";
import BookCardSkeleton from "../components/BookCardSkeleton";
import {
  clearSearchHistory,
  loadSearchHistory,
  saveSearchHistory,
} from "../lib/search";
import { popularBooks, recommendedBooks } from "../lib/recommendedBook";

export type Book = {
  id: string | number;
  title: string;
  author: string;
  description: string;
  image: string;
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [lastQuery, setLastQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showEmpty, setShowEnpty] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [history, setHistory] = useState<string[]>(() => loadSearchHistory());
  const navigate = useNavigate();

  const fetchBooks = async (keyword: string, page: number, append: boolean) => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      setBooks([]);
      setHasSearched(false);
      setShowEnpty(true);
      setLastQuery("");
      return;
    }
    setLastQuery(trimmed);

    if (!append) {
      setBooks([]);
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setShowEnpty(false);

    try {
      const res = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
          trimmed
        )}&page=${page}&size=12`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await res.json();

      const mapped: Book[] = data.documents.map((doc: any) => {
        const isbn = doc.isbn?.split(" ")[0];

        return {
          id: isbn || doc.datetime,
          title: doc.title,
          author: doc.authors?.[0] || "저자 정보 없음",
          description: doc.contents || "",
          image:
            doc.thumbnail ||
            "https://via.placeholder.com/128x180.png?text=No+Image",
        };
      });

      setBooks((prev) => (append ? [...prev, ...mapped] : mapped));
      setHasMore(!data.meta.is_end);
    } catch (e) {
      console.error(e);
      setError("책 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword: string) => {
    const trimmed = keyword.trim();

    if (!trimmed) {
      setSearchParams({});
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    setSearchParams({ query: trimmed });
    saveSearchHistory(trimmed);
    setHistory(loadSearchHistory());

    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleLoadMore = () => {
    if (!query) return;
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    setPage(nextPage);

    fetchBooks(query, nextPage, true);
  };

  useEffect(() => {
    if (!query) {
      // 쿼리가 없으면 초기 화면 상태로
      setBooks([]);
      setHasSearched(false);
      setShowEnpty(true);
      setLastQuery("");
      setLoading(false);
      setError(null);
      return;
    }

    setPage(1);
    fetchBooks(query, 1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const showNoResult = hasSearched && !loading && !error && books.length === 0;

  return (
    <div className="relative min-h-screen">
      <div className="max-w-5xl mx-auto px-5 lg:px-0 flex flex-col gap-2">
        <div className="sticky top-0 bg-white z-10 py-2">
          <SearchBar onSubmit={handleSearch} />
        </div>

        {history.length > 0 && (
          <div className="max-w-2xl mx-auto text-xs text-neutral-500">
            <div className="lg:w-2xl md:w-xl w-md flex justify-between cursor-pointer">
              <p className="mb-2">최근 검색어</p>
              <p
                className="underline"
                onClick={() => {
                  clearSearchHistory();
                  setHistory([]);
                }}
              >
                기록 전체 지우기
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSearch(s)}
                  className="px-2 py-1 rounded-full border border-neutral-200 hover:bg-neutral-100 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {showEmpty && (
          <>
            <section className="mt-2">
              <h2 className="text-lg font-semibold text-neutral-900 pb-8 flex items-center justify-center gap-2">
                <span className="border-b-2 border-pink-400 w-1/3 text-center py-1.5">
                  인기도서
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {popularBooks.map((book, index) => (
                  <div className="relative">
                    <span className="z-10 bg-pink-400 w-10 h-10 rounded-full absolute bottom-18 lg:left-8 left-5 text-3xl font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </span>
                    <div>
                      <BookCard
                        key={book.id}
                        {...book}
                        onClick={() =>
                          navigate(`/book/${book.id}`, { state: { book } })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-3">
              <h2 className="text-lg font-semibold text-neutral-900 pb-8 flex items-center justify-center gap-2">
                <span className="border-b-2 border-green-300 w-1/3 text-center py-1.5">
                  추천 도서
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendedBooks.map((book, index) => (
                  <div className="relative">
                    <span className="z-10 bg-green-300 w-10 h-10 rounded-full absolute bottom-18 lg:left-8 left-5 text-3xl font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </span>
                    <div>
                      <BookCard
                        key={book.id}
                        {...book}
                        onClick={() =>
                          navigate(`/book/${book.id}`, { state: { book } })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {loading && books.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 py-10 text-sm">{error}</p>
        )}

        {showNoResult && (
          <p className="text-center text-neutral-500 py-10 text-sm">
            &quot;{lastQuery}&quot; 검색 결과가 없습니다 ㅠ.ㅠ
          </p>
        )}

        {!showEmpty && !error && books.length > 0 && (
          <div>
            <p className="flex items-center justify-center text-sm text-neutral-500 py-4">
              &quot;{lastQuery}&quot;로 검색한 결과
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  {...book}
                  onClick={() => navigate(`/book/${book.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        <TopButton />

        {books.length > 0 && hasMore && (
          <div className="flex justify-center mt-4 pb-5">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loading}
              className="px-4 py-2 rounded-full border border-neutral-300 text-sm text-neutral-700 hover:bg-neutral-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-default"
            >
              {loading ? "불러오는 중..." : "더 보기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
