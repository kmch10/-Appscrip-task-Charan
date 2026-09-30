"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "@/components/Footer";
import { FilterPanel } from "@/components/FilterPanel";
import { Header } from "@/components/Header";
import { CloseIcon, FilterIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { SortMenu } from "@/components/SortMenu";
import {
  emptySelection,
  filterProducts,
  sortProducts,
} from "@/lib/filters";
import type { CatalogProduct, FilterKey, SortKey } from "@/lib/types";
import styles from "@/components/ProductListing.module.css";

type ProductListingProps = {
  products: CatalogProduct[];
};

export function ProductListing({ products }: ProductListingProps) {
  const closeFiltersRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState(emptySelection);
  const [expanded, setExpanded] = useState<Record<FilterKey, boolean>>({
    idealFor: false,
    occasion: false,
    work: false,
    fabric: false,
    segment: false,
    suitableFor: false,
    rawMaterial: false,
    pattern: false,
  });
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, selection, customizableOnly, query), sort),
    [products, selection, customizableOnly, query, sort],
  );

  const activeFilterCount =
    Object.values(selection).reduce((total, values) => total + values.length, 0) +
    (customizableOnly ? 1 : 0);

  function toggleOption(key: FilterKey, option: string) {
    setSelection((current) => {
      const values = current[key];
      const next = values.includes(option)
        ? values.filter((value) => value !== option)
        : [...values, option];
      return { ...current, [key]: next };
    });
  }

  function selectDepartment(department: string) {
    setSelection((current) => ({ ...current, idealFor: [department] }));
    setFiltersVisible(true);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  function clearFilters() {
    setSelection(emptySelection());
    setCustomizableOnly(false);
    setQuery("");
  }

  function toggleFilters() {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setMobileFiltersOpen(true);
      window.setTimeout(() => closeFiltersRef.current?.focus(), 0);
      return;
    }
    setFiltersVisible((visible) => !visible);
  }

  return (
    <div id="top">
      <a className="skip" href="#products">
        Skip to products
      </a>
      <Header
        query={query}
        wishlistCount={wishlist.length}
        onQueryChange={setQuery}
        onSelectDepartment={selectDepartment}
      />
      <main>
        <section className={styles.hero} aria-labelledby="page-title">
          <div className="wrap">
            <div className={styles.heroCopy}>
              <h1 id="page-title">Discover our products</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
                scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
                dolor.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.toolbar}>
          <div className={`wrap ${styles.toolbarInner}`}>
            <div className={styles.toolbarLeft}>
              <h2>{visibleProducts.length} items</h2>
              <button
                type="button"
                className={styles.filterToggle}
                aria-expanded={isMobile ? mobileFiltersOpen : filtersVisible}
                aria-controls="product-filters"
                onClick={toggleFilters}
              >
                <FilterIcon />
                <span className={styles.desktopFilterLabel}>
                  {filtersVisible ? "Hide filter" : "Show filter"}
                </span>
                <span className={styles.mobileFilterLabel}>
                  Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </span>
              </button>
              {activeFilterCount > 0 || query ? (
                <button type="button" className={styles.clear} onClick={clearFilters}>
                  Clear
                </button>
              ) : null}
            </div>
            <SortMenu value={sort} onChange={setSort} />
          </div>
        </div>

        <div className={`wrap ${styles.catalog}`}>
          <aside
            id="product-filters"
            className={`${styles.sidebar} ${filtersVisible ? "" : styles.sidebarClosed} ${mobileFiltersOpen ? styles.sidebarOpen : ""}`}
            aria-label="Product filters"
          >
            <div className={styles.mobileFilterBar}>
              <p>Filter</p>
              <button
                ref={closeFiltersRef}
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <FilterPanel
              selection={selection}
              expanded={expanded}
              customizableOnly={customizableOnly}
              onToggleExpanded={(key) =>
                setExpanded((current) => ({ ...current, [key]: !current[key] }))
              }
              onToggleOption={toggleOption}
              onToggleCustomizable={() => setCustomizableOnly((value) => !value)}
            />
          </aside>

          <section
            id="products"
            className={styles.results}
            aria-label="Products"
          >
            {visibleProducts.length === 0 ? (
              <p className={styles.empty}>
                No products match these filters.{" "}
                <button type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              </p>
            ) : (
              <div
                className={`${styles.grid} ${filtersVisible ? styles.cols3 : styles.cols4}`}
              >
                {visibleProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    wished={wishlist.includes(product.id)}
                    priority={index < 4}
                    onToggleWish={(id) =>
                      setWishlist((current) =>
                        current.includes(id)
                          ? current.filter((item) => item !== id)
                          : [...current, id],
                      )
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
