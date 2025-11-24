import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="max-w-2xl mx-auto py-5  flex justify-center relative">
      <h1
        onClick={() => navigate("/")}
        className="text-neutral-900 text-3xl font-bold cursor-pointer "
      >
        book finder
      </h1>
      <button
        onClick={() => navigate("/favorite")}
        className="flex flex-col items-center justify-center gap-1 absolute right-3 cursor-pointer group "
      >
        <FaStar className="text-neutral-800 group-hover:text-yellow-300" />
        <span className="text-xs text-neutral-800 group-hover:underline">
          즐겨찾기
        </span>
      </button>
    </header>
  );
}
