import React from "react";
import "./AdminPagination.scss";


export default function AdminPagination({ page, pages, onChange, total }) {
  if (!pages || pages <= 1) return null;

  const go = (p) => {
    if (p < 1 || p > pages || p === page) return;
    onChange?.(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const items = [];
    const delta = 1; // сколько страниц слева/справа показывать

    const add = (p) => items.push(p);

    let left = Math.max(1, page - delta);
    let right = Math.min(pages, page + delta);

    if (left > 1) {
      add(1);
      if (left > 2) add("...");
    }

    for (let p = left; p <= right; p++) add(p);

    if (right < pages) {
      if (right < pages - 1) add("...");
      add(pages);
    }

    return items;
  };

  const items = getPageNumbers();

  return (
    <div className="admin-pagination">
      {typeof total === "number" && (
        <div className="admin-pagination__info">
          Всего: <span>{total}</span>
        </div>
      )}

      <div className="admin-pagination__controls">
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page === 1}
        >
          ‹
        </button>

        {items.map((it, idx) =>
          it === "..." ? (
            <span key={`ellipsis-${idx}`} className="admin-pagination__dots">
              …
            </span>
          ) : (
            <button
              key={it}
              type="button"
              className={page === it ? "active" : ""}
              onClick={() => go(it)}
            >
              {it}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page === pages}
        >
          ›
        </button>
      </div>
    </div>
  );
}
