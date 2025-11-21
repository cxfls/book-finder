import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="py-5 flex justify-center">
      <h1
        onClick={() => navigate("/")}
        className="text-neutral-900 text-3xl font-bold cursor-pointer "
      >
        book finder
      </h1>
    </header>
  );
}
