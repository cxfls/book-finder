export type FavoriteBook = {
  id: string | number;
  title: string;
  author: string;
  image: string;
};

const FAVORITES_KEY = "book_favorites";

export function loadFavorites(): FavoriteBook[] {
  const raw = localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveFavorites(list: FavoriteBook[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

export function toggleFavorite(book: FavoriteBook): FavoriteBook[] {
  let updated: FavoriteBook[];
  // 1. 기존 목록 불러오기
  const favorite = loadFavorites();
  // 2. 이미 있는지 확인
  const exist = favorite.some((item) => item.id === book.id);
  // 3. 있으면 제거, 없으면 추가
  if (exist) {
    updated = favorite.filter((item) => item.id !== book.id);
  } else {
    updated = [...favorite, book];
  }
  // 4. 저장하고, 최종 목록 return
  saveFavorites(updated);

  return updated;
}
