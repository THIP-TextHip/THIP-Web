export const normalizeIsbn = (raw: string) => raw.replace(/[^0-9Xx]/g, '').toUpperCase();

export const isIsbn10 = (isbn: string) => /^[0-9]{9}[0-9X]$/.test(isbn);
export const isIsbn13 = (isbn: string) => /^[0-9]{13}$/.test(isbn);

/** ISBN-10 → ISBN-13 변환 (prefix 978 + 체크디지트 재계산) */
export const isbn10to13 = (isbn10: string) => {
  const core = '978' + isbn10.slice(0, 9); // 기존 체크디지트 제외
  const sum = core
    .split('')
    .map(Number)
    .reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 1 : 3), 0);
  const check = (10 - (sum % 10)) % 10;
  return core + String(check);
};

/** 하이픈/공백 제거 → 10이면 13으로 변환 → 최종 13자리 숫자 반환 */
export const ensureIsbn13 = (raw: string): string | null => {
  const n = normalizeIsbn(raw);
  if (isIsbn13(n)) return n;
  if (isIsbn10(n)) return isbn10to13(n);
  return null;
};
