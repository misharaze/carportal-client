// src/pages/ListingPage/ListingPage.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card.jsx";
import "./ListingPage.scss";
import "../../style/Typography.scss"

function SkeletonCard() {
  return (
    <div className="card card--skeleton">
      <div className="card__image skeleton-block" />
      <div className="card__body">
        <div className="skeleton-line skeleton-line--lg" />
        <div className="skeleton-line skeleton-line--sm" />
        <div className="skeleton-line skeleton-line--sm" />
        <div className="skeleton-bottom">
          <div className="skeleton-line skeleton-line--price" />
          <div className="skeleton-btn" />
        </div>
      </div>
    </div>
  );
}

export default function ListingPage() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    minMileage: "",
    maxMileage: "",
    condition: ""
  });

  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // избранное (локально + localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const perPage = 6;

  const toggleFavorite = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Войдите в аккаунт");
  
    await fetch(`http://localhost:5001/api/favorites/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
  
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };
  
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "")
  );


  // ✅ ЗАГРУЗКА С СЕРВЕРА
  useEffect(() => {
    const params = new URLSearchParams({
      page,
      limit: perPage,
      ...cleanFilters
    });

    setLoading(true);

    fetch(`http://localhost:5001/api/listings?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data.items || []);
        setTotalPages(data.pages || 1);
      })
      .catch((err) => console.error("Ошибка загрузки:", err))
      .finally(() => setLoading(false));
  }, [filters, page]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isNewListing = (car) => {
    if (car.isNew != null) return car.isNew;
    if (!car.createdAt) return false;
    const created = new Date(car.createdAt).getTime();
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return created > weekAgo;
  };

  const isTopListing = (car) => {
    if (car.isTop != null) return car.isTop;
    // простая эвристика: дорогие или маленький пробег
    return (car.price && car.price > 40000) || (car.mileage && car.mileage < 50000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    fetch("http://localhost:5001/api/favorites", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const ids = data.map(f => f.Listing.id);
        setFavorites(ids);
      });
  }, []);

  return (
    <div className="listings-page">
      <h1 className="listings__title">Объявления</h1>

      <button className="filters-toggle" onClick={() => setShowFilters((p) => !p)}>
        {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
      </button>

      <div
        className={`listings-page__content ${
          showFilters ? "show-filters" : ""
        }`}
      >
        {/* ✅ ФИЛЬТРЫ */}
        <aside className="filters">
          <h3>Фильтры</h3>
          <input
            name="brand"
            placeholder="Марка"
            value={filters.brand}
            onChange={handleChange}
          />
          <input
            name="model"
            placeholder="Модель"
            value={filters.model}
            onChange={handleChange}
          />

          <input
            type="number"
            name="minPrice"
            placeholder="Мин. цена"
            value={filters.minPrice}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Макс. цена"
            value={filters.maxPrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="minMileage"
            placeholder="Мин. пробег"
            value={filters.minMileage}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxMileage"
            placeholder="Макс. пробег"
            value={filters.maxMileage}
            onChange={handleChange}
          />

          <select
            name="condition"
            value={filters.condition}
            onChange={handleChange}
          >
            <option value="">Состояние</option>
            <option value="new">Новый</option>
            <option value="used">Б/у</option>
          </select>
        </aside>

        {/* ✅ КАРТОЧКИ / SKELETON */}
        <div className="listings__grid">
          {loading
            ? Array.from({ length: perPage }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : cars.map((car) => (
                <Card
                  key={car.id}
                  {...car}
                  title={`${car.brand} ${car.model}`}
                  isNew={isNewListing(car)}
                  isTop={car.isTop}
                  isFavorite={favorites.includes(car.id)}
                  onToggleFavorite={() => toggleFavorite(car.id)}
                />
              ))}
        </div>
      </div>

      {/* ✅ ПАГИНАЦИЯ С СЕРВЕРА */}
      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
            ‹
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
