type BookDetailProps = {
  book: {
    id: string | number;
    title: string;
    author: string;
    description: string;
    image: string;
  };
  onClose: () => void;
};

export default function BookDetail({ book, onClose }: BookDetailProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative lg:w-2xl md:w-xl w-sm rounded-2xl bg-white flex flex-col gap-4 items-center justify-cente px-10 pb-10 pt-18"
      >
        <img className="lg:w-40 w-30" src={book.image} alt={book.title} />
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p className="text-sm text-neutral-500">{book.author}</p>
        </div>
        <p className="bg-neutral-100 px-7 py-4 rounded-2xl leading-relaxed">
          {book.description}
        </p>
        <button
          className="absolute top-3 right-4 bg-red-200 hover:bg-red-300 transition cursor-pointer w-5 h-5 text-sm flex items-center justify-center rounded-full text-red-500"
          onClick={onClose}
        >
          x
        </button>
      </div>
    </div>
  );
}
