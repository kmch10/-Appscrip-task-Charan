import type {
  CatalogProduct,
  FilterKey,
  FilterSelection,
  SortKey,
} from "@/lib/types";

export const filterGroups: {
  key: FilterKey;
  label: string;
  options: string[];
}[] = [
  {
    key: "idealFor",
    label: "Ideal for",
    options: ["Men", "Women", "Baby & Kids", "Unisex"],
  },
  {
    key: "occasion",
    label: "Occasion",
    options: ["Casual", "Formal", "Party", "Travel", "Wedding"],
  },
  {
    key: "work",
    label: "Work",
    options: ["Office", "Outdoor", "Everyday", "Athleisure"],
  },
  {
    key: "fabric",
    label: "Fabric",
    options: ["Cotton", "Leather", "Wool", "Denim", "Silk", "Polyester"],
  },
  {
    key: "segment",
    label: "Segment",
    options: ["Premium", "Everyday", "Luxury"],
  },
  {
    key: "suitableFor",
    label: "Suitable for",
    options: ["Summer", "Winter", "All season", "Monsoon"],
  },
  {
    key: "rawMaterial",
    label: "Raw materials",
    options: ["Cotton", "Leather", "Metal", "Wool", "Synthetic"],
  },
  {
    key: "pattern",
    label: "Pattern",
    options: ["Solid", "Striped", "Printed", "Embroidered", "Textured"],
  },
];

export const departments = ["Men", "Women", "Baby & Kids", "Unisex"];

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "newest", label: "Newest first" },
  { key: "popular", label: "Popular" },
  { key: "priceDesc", label: "Price : high to low" },
  { key: "priceAsc", label: "Price : low to high" },
];

export function emptySelection(): FilterSelection {
  return {
    idealFor: [],
    occasion: [],
    work: [],
    fabric: [],
    segment: [],
    suitableFor: [],
    rawMaterial: [],
    pattern: [],
  };
}

export function filterProducts(
  products: CatalogProduct[],
  selection: FilterSelection,
  customizableOnly: boolean,
  query: string,
) {
  const needle = query.trim().toLowerCase();

  return products.filter((product) => {
    if (customizableOnly && !product.customizable) return false;

    if (needle) {
      const haystack = `${product.title} ${product.description} ${product.category}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    return filterGroups.every((group) => {
      const selected = selection[group.key];
      return selected.length === 0 || selected.includes(product[group.key]);
    });
  });
}

export function sortProducts(products: CatalogProduct[], sort: SortKey) {
  const sorted = [...products];

  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    case "popular":
      return sorted.sort(
        (a, b) => b.rating.count - a.rating.count || b.rating.rate - a.rating.rate,
      );
    case "priceDesc":
      return sorted.sort((a, b) => b.price - a.price);
    case "priceAsc":
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
}
