import React, { useState, useEffect, useRef } from "react";
import "./RecommendedSlider.scss";
import Card from "../../components/Card/Card";
import { API_URL } from "../../config/api";
export default function RecommendedSlider() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const trackRef = useRef(null);

  /* =========================
     RESPONSIVE
  ========================== */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* =========================
     LOAD FROM SERVER
  ========================== */
  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/api/listings?limit=10`)
      .then(res => res.json())
      .then(data => {
        setCars(data.items || []);
      })
      .catch(err => {
        console.error("Ошибка загрузки рекомендаций", err);
      })
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     SLIDER CONTROLS
  ========================== */
  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev <= 0 ? Math.max(cars.length - cardsPerView, 0) : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev >= cars.length - cardsPerView ? 0 : prev + 1
    );
  };

  if (loading) {
    return null; // или skeleton
  }

  if (cars.length === 0) {
    return null;
  }

  return (
    <div className="recommended-slider">
      <h2>Рекомендуемое авто</h2>

      <div className="slider-container">
        <button className="nav prev" onClick={prevSlide}>
          ‹
        </button>

        <div className="slider-track-wrapper">
          <div
            className="slider-track"
            ref={trackRef}
            style={{
              transform: `translateX(-${(100 / cardsPerView) * currentIndex}%)`,
              gridTemplateColumns: `repeat(${cars.length}, calc(100% / ${cardsPerView}))`
            }}
          >
            {cars.map(car => (
              <div className="slide" key={car.id}>
                <Card
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
              </div>
            ))}
          </div>
        </div>

        <button className="nav next" onClick={nextSlide}>
          ›
        </button>
      </div>
    </div>
  );
}
