export function artistSlug(name) {
  return String(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function artistHref(name) {
  return `/artists/${artistSlug(name)}`;
}

export function slugToSearchName(slug) {
  return decodeURIComponent(slug).replace(/-/g, " ");
}

export function artistSearchTerm(param) {
  const decoded = decodeURIComponent(param).trim();
  if (decoded.includes("-") && !decoded.includes(" ")) {
    return slugToSearchName(decoded);
  }
  return decoded;
}
