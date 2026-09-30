"use client";

import { useEffect, useRef, useState } from "react";
import { sortOptions } from "@/lib/filters";
import type { SortKey } from "@/lib/types";
import { CheckIcon, ChevronIcon } from "@/components/icons";
import styles from "@/components/SortMenu.module.css";

type SortMenuProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export function SortMenu({ value, onChange }: SortMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = sortOptions.find((option) => option.key === value);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
      >
        <span className="srOnly">Sort by</span>
        {current?.label}
        <ChevronIcon className={open ? styles.chevronOpen : undefined} />
      </button>
      {open ? (
        <ul className={styles.menu} role="listbox" aria-label="Sort products">
          {sortOptions.map((option) => {
            const selected = option.key === value;
            return (
              <li key={option.key} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.key);
                    setOpen(false);
                  }}
                >
                  <span className={styles.check}>
                    {selected ? <CheckIcon /> : null}
                  </span>
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
