"use client";

import { useEffect, useId, useRef, useState } from "react";
import { departments } from "@/lib/filters";
import {
  BagIcon,
  ChevronIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";
import styles from "@/components/Header.module.css";

const primaryLinks = [
  { href: "#about", label: "Skills" },
  { href: "#about", label: "Stories" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact us" },
];

type HeaderProps = {
  query: string;
  wishlistCount: number;
  onQueryChange: (value: string) => void;
  onSelectDepartment: (department: string) => void;
};

export function Header({
  query,
  wishlistCount,
  onQueryChange,
  onSelectDepartment,
}: HeaderProps) {
  const searchId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!shopOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!shopRef.current?.contains(event.target as Node)) setShopOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setShopOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [shopOpen]);

  function closeSearch() {
    setSearchOpen(false);
    onQueryChange("");
  }

  function chooseDepartment(department: string) {
    onSelectDepartment(department);
    setShopOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <a className={styles.logo} href="#top" aria-label="Home">
          LOGO
        </a>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={`Wishlist, ${wishlistCount} saved`}
          >
            <HeartIcon filled={wishlistCount > 0} />
            {wishlistCount > 0 ? (
              <span className={styles.badge}>{wishlistCount}</span>
            ) : null}
          </button>
          <button type="button" className={styles.iconButton} aria-label="Bag">
            <BagIcon />
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.account}`}
            aria-label="Account"
          >
            <UserIcon />
          </button>
        </div>
      </div>

      <nav className={`wrap ${styles.nav}`} aria-label="Primary">
        <a className={styles.homeLink} href="#top">
          Home
        </a>
        <div className={styles.shop} ref={shopRef}>
          <button
            type="button"
            className={styles.navButton}
            aria-expanded={shopOpen}
            aria-haspopup="menu"
            onClick={() => setShopOpen((open) => !open)}
          >
            Shop
            <ChevronIcon className={shopOpen ? styles.chevronOpen : undefined} />
          </button>
          {shopOpen ? (
            <ul className={styles.shopMenu} role="menu">
              {departments.map((department) => (
                <li key={department} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => chooseDepartment(department)}
                  >
                    {department}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {primaryLinks.map((link) => (
          <a key={link.label} className={styles.wideLink} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      {searchOpen ? (
        <div className={styles.searchRow}>
          <form
            className={`wrap ${styles.searchForm}`}
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="srOnly" htmlFor={searchId}>
              Search products
            </label>
            <input
              ref={searchRef}
              id={searchId}
              type="search"
              value={query}
              placeholder="Search products"
              onChange={(event) => onQueryChange(event.target.value)}
            />
            <button type="button" onClick={closeSearch}>
              Close
            </button>
          </form>
        </div>
      ) : null}

      {menuOpen ? (
        <nav className={styles.drawer} aria-label="Mobile">
          <p className={styles.drawerLabel}>Shop</p>
          <ul>
            {departments.map((department) => (
              <li key={department}>
                <button type="button" onClick={() => chooseDepartment(department)}>
                  {department}
                </button>
              </li>
            ))}
          </ul>
          <ul className={styles.drawerLinks}>
            {primaryLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
