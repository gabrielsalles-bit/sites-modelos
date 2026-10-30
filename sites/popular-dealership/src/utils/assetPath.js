export function withBase(relativePath) {
  const base = import.meta.env.BASE_URL || '/';
  const clean = relativePath.replace(/^\/+/, '');
  return `${base}${clean}`;
}
