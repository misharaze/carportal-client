import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ListingDetailsPage.scss";
import CarHistoryCheck from "../../components/CarHistoryCheck/CarHistoryCheck";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5001/api/listings/${id}`)
      .then(res => res.json())
      .then(data => {
        // ✅ если нет массива фото — делаем из одного
        data.images = data.images?.length ? data.images : [data.image];
        setCar(data);
      })
      .catch(console.error);
  }, [id]);

  if (!car) return <p className="loading">Загрузка...</p>;

  return (
    <div className="details fade-in">
      <div className="details__wrapper slide-up">

        {/* ✅ ЛЕВАЯ КАРУСЕЛЬ */}
        <div className="details__image-card">
          <img
            src={car.images[activeImage]}
            alt={car.brand}
            className="main-image fade-scale"
          />

          {/* ✅ Миниатюры */}
          <div className="details__thumbs">
            {car.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className={activeImage === i ? "active" : ""}
                onClick={() => setActiveImage(i)}
              />
            ))}
          </div>
        </div>

        {/* ✅ ПРАВАЯ ЧАСТЬ */}
        <div className="details__info-card fade-right">
          <h1>{car.brand} {car.model}</h1>
          <p className="price">{car.price} €</p>

          <div className="details__specs">
            <div><span>Год</span>{car.year}</div>
            <div><span>Пробег</span>{car.mileage} км</div>
            <div><span>VIN</span>{car.vin || "Не указан"}</div>
            <div><span>Топливо</span>{car.fuelType}</div>
            <div><span>Коробка</span>{car.gearbox}</div>
            <div><span>Привод</span>{car.drive}</div>
          </div>

          <div className="details__description">
            <h3>Описание</h3>
            <p>{car.description}</p>
          </div>

          {car.vin && <CarHistoryCheck vin={car.vin} />}

          {/* ✅ КНОПКИ */}
          <div className="details__actions">
            <button className="buy-btn">Купить сейчас</button>
            <button className="message-btn">Написать продавцу</button>
            <button className="save-btn">В избранное</button>
          </div>
        </div>

      </div>
    </div>
  );
}
