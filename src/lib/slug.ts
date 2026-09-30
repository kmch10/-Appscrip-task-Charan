export function productSlug(title: string, id: number) {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `${base || "product"}-${id}`;
}

export function productImageName(title: string, id: number, imageUrl: string) {
  const rawExtension = imageUrl.split(".").pop()?.split("?")[0]?.toLowerCase();
  const extension =
    rawExtension === "jpg" ||
    rawExtension === "jpeg" ||
    rawExtension === "png" ||
    rawExtension === "webp"
      ? rawExtension
      : "jpg";

  return `${productSlug(title, id)}.${extension}`;
}
