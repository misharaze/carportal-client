import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandsCatalogPage.scss";

export default function BrandsCatalogPage() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     ЗАГРУЗКА БРЕНДОВ С СЕРВЕРА
  ========================== */
  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await fetch("http://localhost:5001/api/brands");
        const data = await res.json();
  
        console.log("FULL RESPONSE:", data);

        setBrands(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Ошибка загрузки брендов", e);
        setBrands([]);
      }finally {
        setLoading(false);
      }
    }
  
    loadBrands();
  }, []);

  /* =========================
     ФИЛЬТРАЦИЯ ПО ПОИСКУ
  ========================== */
  const safeBrands = Array.isArray(brands) ? brands : [];

  const filteredBrands = safeBrands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  /* =========================
     JSX
  ========================== */
  return (
    <div className="brands-page">
      {/* 🔥 HEADER */}
      <header className="brands-header">
        <h1>Каталог автомобилей</h1>
        <p>Выберите бренд и модель, чтобы посмотреть объявления</p>
      </header>

      <div className="brands-layout">
        {/* =====================
            SIDEBAR (БРЕНДЫ)
        ====================== */}
        <aside className="brands-sidebar">
          <input
            type="text"
            placeholder="Поиск бренда…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {loading && (
            <p className="sidebar-hint">Загрузка брендов…</p>
          )}

          {!loading && filteredBrands.length === 0 && (
            <p className="sidebar-hint">Бренды не найдены</p>
          )}

          {!loading && filteredBrands.length > 0 && (
            <div className="brands-list">
            {filteredBrands.map((brand, index) => (
  <button
    key={brand.name} // или index (временно)
    className={`brand-btn ${
      selectedBrand?.name === brand.name ? "active" : ""
    }`}
    onClick={() => setSelectedBrand(brand)}
  >
    {brand.name}
  </button>
))}
            </div>
          )}
        </aside>

        {/* =====================
            CONTENT (МОДЕЛИ)
        ====================== */}
        <section className="brands-content">
          {loading && <p className="hint">Загрузка…</p>}

          {!loading && !selectedBrand && (
            <p className="hint">Выберите бренд слева</p>
          )}

          {selectedBrand && (
            <>
              <h2 className="brand-title">{selectedBrand.name}</h2>

              {selectedBrand.models?.length > 0 ? (
                <div className="models-grid">


                {selectedBrand.models.map((model, index) => (
  <div
    key={model.name} // или index
    className="model-card clickable"
    onClick={() =>
      navigate(
        `/listings?brand=${selectedBrand.name}&model=${model.name}`
      )
    }
  >
                      <h3>{model.name}</h3>

                      <ul>
                        {model.year && <li>Год: {model.year}</li>}
                        {model.engine && <li>Двигатель: {model.engine}</li>}
                        {model.power && (
                          <li>Мощность: {model.power} л.с.</li>
                        )}
                      </ul>

                      <span className="model-cta">
                        Смотреть объявления →
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="hint">Модели пока не добавлены</p>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
