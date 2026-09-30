export type StoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type FilterKey =
  | "idealFor"
  | "occasion"
  | "work"
  | "fabric"
  | "segment"
  | "suitableFor"
  | "rawMaterial"
  | "pattern";

export type CatalogProduct = StoreProduct & {
  slug: string;
  imageSrc: string;
  idealFor: string;
  occasion: string;
  work: string;
  fabric: string;
  segment: string;
  suitableFor: string;
  rawMaterial: string;
  pattern: string;
  customizable: boolean;
};

export type FilterSelection = Record<FilterKey, string[]>;

export type SortKey =
  | "recommended"
  | "newest"
  | "popular"
  | "priceDesc"
  | "priceAsc";
