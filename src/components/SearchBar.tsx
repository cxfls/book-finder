import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full mx-auto flex items-center gap-3 bg-blue-100 px-4 py-2.5 rounded-4xl">
      <FaSearch />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="outline-0 flex-1 text-lg"
        placeholder="검색어를 입력하세요"
      />
      <button className="bg-neutral-950 text-white text-sm px-3 py-1.5 rounded-2xl cursor-pointer">
        검색
      </button>
    </div>
  );
}
