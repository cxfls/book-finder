import "./App.css";
import BookCard from "./components/BookCard";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
};

const mockBooks: Book[] = [
  {
    id: 1,
    title: "나미야 잡화점의 기적",
    author: "히가시노 게이고",
    description: "과거와 현재를 잇는 따뜻한 메세지 이야기",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 2,
    title: "클린 코드",
    author: "Robert C. Martin",
    description: "읽기 좋은 코드, 유지보수 쉬운 코드 만드는 법",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 3,
    title: "자바스크립트 완벽 가이드",
    author: "David Flanagan",
    description: "JS를 깊이 있게 배우고 싶은 개발자를 위한 책",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 4,
    title: "나미야 잡화점의 기적",
    author: "히가시노 게이고",
    description: "과거와 현재를 잇는 따뜻한 메세지 이야기",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 5,
    title: "클린 코드",
    author: "Robert C. Martin",
    description: "읽기 좋은 코드, 유지보수 쉬운 코드 만드는 법",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 6,
    title: "자바스크립트 완벽 가이드",
    author: "David Flanagan",
    description: "JS를 깊이 있게 배우고 싶은 개발자를 위한 책",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 7,
    title: "나미야 잡화점의 기적",
    author: "히가시노 게이고",
    description: "과거와 현재를 잇는 따뜻한 메세지 이야기",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 8,
    title: "클린 코드",
    author: "Robert C. Martin",
    description: "읽기 좋은 코드, 유지보수 쉬운 코드 만드는 법",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
  {
    id: 9,
    title: "자바스크립트 완벽 가이드",
    author: "David Flanagan",
    description: "JS를 깊이 있게 배우고 싶은 개발자를 위한 책",
    image: "https://image.yes24.com/Goods/102939418/XL",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const filteredBooks = mockBooks.filter((book) => {
    if (!search.trim) return true;
    const lower = search.toLocaleLowerCase();
    return (
      book.title.toLocaleLowerCase().includes(lower) ||
      book.author.toLocaleLowerCase().includes(lower)
    );
  });
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-3">
      <Header />
      <SearchBar value={search} onChange={setSearch} />
      {filteredBooks.length === 0 ? (
        <p className="w-full flex justify-center text-2xl font-semibold mt-20 text-neutral-700">
          검색 결과가 없습니다 ㅠ.ㅠ
        </p>
      ) : (
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3 mt-5">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
