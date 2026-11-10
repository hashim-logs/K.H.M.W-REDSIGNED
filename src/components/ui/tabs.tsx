"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

export function Tabs({
  id,
  label,
  items,
}: {
  id: string;
  label: string;
  items: TabItem[];
}) {
  const firstEnabled = items.findIndex((item) => !item.disabled);
  const [selectedIndex, setSelectedIndex] = useState(Math.max(firstEnabled, 0));
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function selectNextTab(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = selectedIndex;
    if (event.key === "Home") {
      nextIndex = items.findIndex((item) => !item.disabled);
    } else if (event.key === "End") {
      nextIndex = items.findLastIndex((item) => !item.disabled);
    } else {
      const direction = event.key === "ArrowRight" ? 1 : -1;
      for (let attempt = 0; attempt < items.length; attempt += 1) {
        nextIndex = (nextIndex + direction + items.length) % items.length;
        if (!items[nextIndex]?.disabled) break;
      }
    }

    if (nextIndex < 0 || items[nextIndex]?.disabled) return;
    setSelectedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  const selectedTab = items[selectedIndex];
  if (!selectedTab) return null;

  return (
    <div className="grid gap-4">
      <div
        className="flex flex-wrap gap-1 border-b border-navy-200"
        role="tablist"
        aria-label={label}
        onKeyDown={selectNextTab}
      >
        {items.map((item, index) => {
          const selected = index === selectedIndex;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${id}-tab-${item.id}`}
              className={`min-h-11 border-b-2 px-4 py-2 text-small font-semibold transition-transform active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-current)] disabled:pointer-events-none disabled:opacity-50 ${
                selected
                  ? "border-gold text-navy-900"
                  : "border-transparent text-navy-700 hover:border-navy-300 hover:text-navy-900"
              }`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => setSelectedIndex(index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        id={`${id}-panel-${selectedTab.id}`}
        className="rounded-small focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-current)]"
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selectedTab.id}`}
        tabIndex={0}
      >
        {selectedTab.content}
      </div>
    </div>
  );
}
