const SEARCH_KEY = "book_search_history";

export function loadSearchHistory(): string[] {
  const raw = localStorage.getItem(SEARCH_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];
    return parsed as string[];
  } catch {
    return [];
  }
}

export function saveSearchHistory(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return;

  const raw = localStorage.getItem(SEARCH_KEY);
  let history: string[] = [];

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        history = parsed as string[];
      }
    } catch {
      history = [];
    }
  }

  // 중복 제거 후 맨 앞에 추가
  const updated = [
    trimmed,
    ...history.filter((item) => item !== trimmed),
  ].slice(
    0,
    10 // 최대 10개까지만 저장
  );

  localStorage.setItem(SEARCH_KEY, JSON.stringify(updated));
}

export function clearSearchHistory() {
  localStorage.removeItem(SEARCH_KEY);
}
