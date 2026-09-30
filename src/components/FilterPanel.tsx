import { filterGroups } from "@/lib/filters";
import type { FilterKey, FilterSelection } from "@/lib/types";
import { ChevronIcon } from "@/components/icons";
import styles from "@/components/FilterPanel.module.css";

type FilterPanelProps = {
  selection: FilterSelection;
  expanded: Record<FilterKey, boolean>;
  customizableOnly: boolean;
  onToggleExpanded: (key: FilterKey) => void;
  onToggleOption: (key: FilterKey, option: string) => void;
  onToggleCustomizable: () => void;
};

export function FilterPanel({
  selection,
  expanded,
  customizableOnly,
  onToggleExpanded,
  onToggleOption,
  onToggleCustomizable,
}: FilterPanelProps) {
  return (
    <div className={styles.panel}>
      <label className={styles.customizable}>
        <input
          type="checkbox"
          checked={customizableOnly}
          onChange={onToggleCustomizable}
        />
        <span>Customizable</span>
      </label>

      {filterGroups.map((group) => {
        const open = expanded[group.key];
        const selected = selection[group.key];
        const summary = selected.length > 0 ? selected.join(", ") : "All";

        return (
          <section key={group.key} className={styles.group}>
            <h3>
              <button
                type="button"
                className={styles.groupButton}
                aria-expanded={open}
                onClick={() => onToggleExpanded(group.key)}
              >
                <span>
                  <span className={styles.groupLabel}>{group.label}</span>
                  {open ? null : (
                    <span className={styles.summary}>{summary}</span>
                  )}
                </span>
                <ChevronIcon className={open ? styles.chevronOpen : undefined} />
              </button>
            </h3>
            {open ? (
              <fieldset className={styles.options}>
                <legend className="srOnly">{group.label}</legend>
                {group.options.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={selected.includes(option)}
                      onChange={() => onToggleOption(group.key, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
