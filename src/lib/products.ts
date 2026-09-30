import { productImageName, productSlug } from "@/lib/slug";
import type { CatalogProduct, StoreProduct } from "@/lib/types";

const PRODUCT_API = "https://fakestoreapi.com/products";

function pick(options: string[], id: number, salt: number) {
  return options[(id * salt) % options.length];
}

function matchKeyword(
  text: string,
  pairs: [string, string][],
  fallback: string,
) {
  const match = pairs.find(([keyword]) => text.includes(keyword));
  return match ? match[1] : fallback;
}

function enrich(product: StoreProduct): CatalogProduct {
  const text = `${product.title} ${product.description}`.toLowerCase();
  const idealFor =
    product.id === 4 || product.id === 20
      ? "Baby & Kids"
      : product.category === "men's clothing"
        ? "Men"
        : product.category === "women's clothing"
          ? "Women"
          : product.category === "jewelery"
            ? product.id % 2 === 0
              ? "Women"
              : "Unisex"
            : "Unisex";

  return {
    ...product,
    slug: productSlug(product.title, product.id),
    imageSrc: `/images/products/${productImageName(product.title, product.id, product.image)}`,
    idealFor,
    occasion: matchKeyword(
      text,
      [
        ["wedding", "Wedding"],
        ["engagement", "Wedding"],
        ["party", "Party"],
        ["hiking", "Travel"],
        ["camping", "Travel"],
        ["travel", "Travel"],
        ["outdoor", "Travel"],
        ["work", "Formal"],
        ["office", "Formal"],
        ["casual", "Casual"],
      ],
      pick(["Casual", "Formal", "Party", "Travel", "Wedding"], product.id, 3),
    ),
    work: matchKeyword(
      text,
      [
        ["office", "Office"],
        ["work", "Office"],
        ["hiking", "Outdoor"],
        ["camping", "Outdoor"],
        ["climbing", "Outdoor"],
        ["outdoor", "Outdoor"],
        ["sport", "Athleisure"],
        ["gym", "Athleisure"],
      ],
      pick(["Office", "Outdoor", "Everyday", "Athleisure"], product.id, 5),
    ),
    fabric: matchKeyword(
      text,
      [
        ["leather", "Leather"],
        ["cotton", "Cotton"],
        ["wool", "Wool"],
        ["fleece", "Wool"],
        ["denim", "Denim"],
        ["silk", "Silk"],
        ["polyester", "Polyester"],
        ["polyurethane", "Polyester"],
      ],
      pick(
        ["Cotton", "Leather", "Wool", "Denim", "Silk", "Polyester"],
        product.id,
        7,
      ),
    ),
    segment:
      product.price >= 200
        ? "Luxury"
        : product.price >= 50
          ? "Premium"
          : "Everyday",
    suitableFor: matchKeyword(
      text,
      [
        ["winter", "Winter"],
        ["fleece", "Winter"],
        ["jacket", "Winter"],
        ["coat", "Winter"],
        ["rain", "Monsoon"],
        ["summer", "Summer"],
        ["moisture", "Summer"],
        ["short sleeve", "Summer"],
      ],
      pick(["Summer", "Winter", "All season", "Monsoon"], product.id, 4),
    ),
    rawMaterial:
      product.category === "jewelery"
        ? "Metal"
        : product.category === "electronics"
          ? "Synthetic"
          : matchKeyword(
              text,
              [
                ["leather", "Leather"],
                ["cotton", "Cotton"],
                ["wool", "Wool"],
                ["fleece", "Wool"],
              ],
              pick(["Cotton", "Leather", "Metal", "Wool", "Synthetic"], product.id, 6),
            ),
    pattern: matchKeyword(
      text,
      [
        ["stripe", "Striped"],
        ["print", "Printed"],
        ["letter", "Printed"],
        ["embroider", "Embroidered"],
        ["dragon", "Embroidered"],
        ["naga", "Embroidered"],
        ["knit", "Textured"],
        ["texture", "Textured"],
      ],
      pick(
        ["Solid", "Striped", "Printed", "Embroidered", "Textured"],
        product.id,
        2,
      ),
    ),
    customizable:
      product.category !== "electronics" && product.id % 2 === 0,
  };
}

export async function getProducts(): Promise<CatalogProduct[]> {
  const response = await fetch(PRODUCT_API, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Product catalog request failed (${response.status})`);
  }

  const products = (await response.json()) as StoreProduct[];
  return products.map(enrich);
}
