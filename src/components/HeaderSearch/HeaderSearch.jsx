import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../ui/icons";
import './HeaderSearch.scss'
import { API_URL } from "../../config/api.js";

export default function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const timer = useRef(null);

  const isMobile = window.innerWidth < 900;

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fetch(`${API_URL}/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
          setResults(data || []);
          setOpen(true);
        });
    }, 300);
  }, [query]);

  const select = (id) => {
    setQuery("");
    setOpen(false);
    setMobileOpen(false);
    navigate(`/listings/${id}`);
  };

  /* =========================
     DESKTOP SEARCH
  ========================== */
  if (!isMobile) {
    return (
      <div className="header-search">
        <SearchIcon />
        <input
          placeholder="Поиск авто…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
        />

        {open && results.length > 0 && (
          <div className="search-dropdown">
            {results.map(item => (
              <div
                key={item.id}
                className="search-item"
                onClick={() => select(item.id)}
              >
                <span>{item.brand} {item.model}</span>
                <span className="price">{item.price} €</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* =========================
     MOBILE SEARCH (FULLSCREEN)
  ========================== */
  return (
    <>
      <button className="mobile-search-btn" onClick={() => setMobileOpen(true)}>
        <SearchIcon />
      </button>

      {mobileOpen && (
        <div className="mobile-search">
          <div className="mobile-search__header">
            <input
              autoFocus
              placeholder="Поиск автомобиля…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button onClick={() => setMobileOpen(false)}>✕</button>
          </div>

          <div className="mobile-search__results">
            {results.map(item => (
              <div
                key={item.id}
                className="mobile-search__item"
                onClick={() => select(item.id)}
              >
                <div>
                  <strong>{item.brand} {item.model}</strong>
                  <span>{item.price} €</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
