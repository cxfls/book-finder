import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  onSubmit: (query: string) => void;
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const query = value.trim();
    if (!query) return;
    onSubmit(query);
    setValue("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="lg:w-2xl md:w-xl mx-auto flex items-center gap-3 bg-neutral-100 px-4 py-2.5 rounded-4xl">
      <FaSearch />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="outline-0 flex-1 text-lg"
        placeholder="검색어를 입력하세요"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSubmit}
        className="bg-neutral-950 text-white text-sm px-3 py-1.5 rounded-2xl cursor-pointer"
      >
        검색
      </button>
    </div>
  );
}
