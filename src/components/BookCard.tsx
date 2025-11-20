type BookCardProps = {
  title: string;
  author: string;
  image: string;
};

export default function BookCard({ title, author, image }: BookCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
      <img
        src={image}
        alt="이미지"
        className="w-30 hover:scale-105 transition"
      />
      <div className="flex flex-col items-center">
        <h2 className="font-bold">{title}</h2>
        <p className="text-sm text-neutral-500">{author}</p>
      </div>
    </div>
  );
}
