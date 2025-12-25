// src/components/Card/Card.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({
  id,
  title,
  year,
  mileage,
  price,
  image,
  fuelType,
  gearbox,
  drive,
  isNew,
  isTop,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <div className="card">
      {/* Бейджи */}
      {(isNew || isTop) && (
        <div className="card__badges">
          {isNew && <span className="card__badge card__badge--new">Новинка</span>}
          {isTop && <span className="card__badge card__badge--top">ТОП</span>}
        </div>
      )}

      {/* Кнопка лайка */}
      <button
        type="button"
        className={`card__favorite ${isFavorite ? "card__favorite--active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onToggleFavorite && onToggleFavorite();
        }}
      >
        <span>♥</span>
      </button>

      <div className="card__image">
        <img src={image} alt={title} loading="lazy" />
      </div>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>

        {/* Иконки характеристик */}
        <div className="card__specs">
          {year && (
            <div className="card__spec">
              <span className="card__spec-icon">📅</span>
              <span>{year}</span>
            </div>
          )}

          {mileage && (
            <div className="card__spec">
              <span className="card__spec-icon">🛣</span>
              <span>{mileage} км</span>
            </div>
          )}

          {fuelType && (
            <div className="card__spec">
              <span className="card__spec-icon">⛽</span>
              <span>{fuelType}</span>
            </div>
          )}

          {gearbox && (
            <div className="card__spec">
              <span className="card__spec-icon">⚙️</span>
              <span>{gearbox}</span>
            </div>
          )}

          {drive && (
            <div className="card__spec">
              <span className="card__spec-icon">🧭</span>
              <span>{drive}</span>
            </div>
          )}
        </div>

        <div className="card__bottom">
          <p className="card__price">{price} €</p>
          {id ? (
            <Link to={`/listings/${id}`} className="card__button">
              Подробнее
            </Link>
          ) : (
            <button className="card__button">Подробнее</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
