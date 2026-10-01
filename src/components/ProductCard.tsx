import type { CatalogProduct } from "@/lib/types";
import { HeartIcon } from "@/components/icons";
import styles from "@/components/ProductCard.module.css";

type ProductCardProps = {
  product: CatalogProduct;
  wished: boolean;
  priority?: boolean;
  onToggleWish: (id: number) => void;
};

export function ProductCard({
  product,
  wished,
  priority = false,
  onToggleWish,
}: ProductCardProps) {
  return (
    <article className={styles.card} id={`product-${product.id}`}>
      <div className={styles.media}>
        {/* Local files keep a readable name in the page source. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageSrc}
          alt={`${product.title}, ${product.category}`}
          width={640}
          height={800}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onError={(event) => {
            const image = event.currentTarget;
            if (image.src !== product.image) image.src = product.image;
          }}
        />
      </div>
      <div className={styles.meta}>
        <h3>{product.title}</h3>
        <button
          type="button"
          className={wished ? styles.wished : undefined}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.title} from wishlist` : `Save ${product.title}`}
          onClick={() => onToggleWish(product.id)}
        >
          <HeartIcon filled={wished} />
        </button>
      </div>
      <p className={styles.note}>
        <span>Sign in</span> or Create an account to see pricing
      </p>
    </article>
  );
}
