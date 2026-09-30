import { ProductListing } from "@/components/ProductListing";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "mettā muse",
        email: "customercare@mettamuse.com",
        telephone: "+44 221 133 5360",
      },
      {
        "@type": "CollectionPage",
        name: "Discover Our Products",
        description:
          "Browse the mettā muse collection. Filter by fit, occasion, fabric, and pattern, then sort by recommendation, popularity, or price.",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.title,
              image: product.image,
              description: product.description,
              category: product.category,
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: product.price,
                availability: "https://schema.org/InStock",
              },
            },
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductListing products={products} />
    </>
  );
}
