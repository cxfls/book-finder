export default function BookCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 mb-4 animate-pulse">
      {/* 책 이미지 자리 */}
      <div className="w-28 h-40 rounded-md bg-neutral-200" />

      {/* 제목 자리 */}
      <div className="h-4 w-24 rounded bg-neutral-200" />

      {/* 작가 자리 */}
      <div className="h-3 w-16 rounded bg-neutral-200" />
    </div>
  );
}
