import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/Card/Card";
import RecommendedSlider from "../../components/RecommendedSlider/RecommendedSlider";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
  const [latestListings, setLatestListings] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  /* =========================
     ПОСЛЕДНИЕ ОБЪЯВЛЕНИЯ
  ========================== */
  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:5001/api/listings?limit=4&page=1")
      .then(res => res.json())
      .then(data => {
        setLatestListings(data.items || []);
      })
      .catch(err => {
        console.error("Ошибка загрузки объявлений", err);
      })
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     ПОПУЛЯРНЫЕ БРЕНДЫ
  ========================== */
  useEffect(() => {
    fetch("http://localhost:5001/api/brands")
      .then(res => res.json())
      .then(data => {
        setBrands(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Ошибка загрузки брендов", err);
      });
  }, []);

  return (
    <div className="home">

      {/* ✅ HERO */}
      <section className="home__hero fade-in">
        <div className="home__hero-overlay">
          <h1>CarPortal</h1>
          <p>
            Премиальная платформа автомобильных объявлений.
            Только проверенные автомобили.
          </p>

          <div className="home__cta">
            <button
              className="cta-btn cta-btn--primary"
              onClick={() => navigate("/contact")}
            >
              Получить консультацию
            </button>

            <button
              className="cta-btn cta-btn--glass"
              onClick={() => navigate("/listings")}
            >
              Смотреть авто →
            </button>
          </div>
        </div>
      </section>

      {/* ✅ ПОСЛЕДНИЕ ПОСТУПЛЕНИЯ */}
      <section className="home__latest fade-up">
        <h2>Последние поступления</h2>

        <div className="home__latest-grid">
          {loading && <p>Загрузка...</p>}

          {!loading && latestListings.length === 0 && (
            <p>Объявлений пока нет</p>
          )}

          {!loading &&
            latestListings.map(car => (
              <Card
                key={car.id}
                id={car.id}
                title={`${car.brand} ${car.model}`}
                price={car.price}
                year={car.year}
                mileage={car.mileage}
                image={car.image}
                fuelType={car.fuelType}
                gearbox={car.gearbox}
                drive={car.drive}
                isNew={car.isNew}
                isTop={car.isTop}
              />
            ))}
        </div>
      </section>

      {/* ✅ УСЛУГИ (СТАТИКА — ЭТО НОРМ) */}
      <section className="home__info fade-up">
        <h2>У нас вы можете не только купить автомобиль</h2>

        <div className="home__info-grid">
          <div className="home__info-card">
            <h3>Диагностика</h3>
            <p>Комплексная проверка авто перед покупкой</p>
          </div>

          <div className="home__info-card">
            <h3>Выкуп</h3>
            <p>Срочный выкуп автомобилей в день обращения</p>
          </div>

          <div className="home__info-card">
            <h3>Продажа</h3>
            <p>Комиссионная продажа с рекламой и сопровождением</p>
          </div>
        </div>

        <Button variant="primary">Получить консультацию</Button>
      </section>

      {/* ✅ БРЕНДЫ С СЕРВЕРА */}
      <section className="home__brands fade-up">
        <h2>Популярные бренды</h2>

        <div className="home__brands-grid">
          {brands.map((brand, i) => (
            <Button key={i} variant="outlined">
              {brand.name}
            </Button>
          ))}
        </div>
      </section>

      {/* ✅ РЕКОМЕНДАЦИИ (если тоже из API — можно потом) */}
      <RecommendedSlider />
    </div>
  );
}
