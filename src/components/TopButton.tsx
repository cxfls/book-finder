import { useEffect, useState } from "react";
import { BiArrowToTop } from "react-icons/bi";

export default function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={`fixed right-5 bottom-5 w-10 h-10 rounded-full bg-neutral-900 text-white shadow-md flex items-center justify-center transition-all duration-300 hover:bg-neutral-700 cursor-pointer
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }
      `}
    >
      <BiArrowToTop className="text-lg" />
    </button>
  );
}
