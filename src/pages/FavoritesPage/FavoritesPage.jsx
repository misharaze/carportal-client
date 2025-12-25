import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./FavoritesPage.scss";

export default function FavoritesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5001/api/favorites", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setItems(data || []))
      .catch(console.error);
  }, []);

  return (
    <section className="favorites">
      <header className="favorites__header">
        <h1>Избранные автомобили</h1>
        <p>Автомобили, которые вы добавили в избранное</p>
      </header>

      {items.length === 0 && (
        <div className="favorites__empty">
          <p>Пока здесь пусто</p>
        </div>
      )}

      <div className="favorites__grid">
        {items.map(f => (
          <Card
            key={f.Listing.id}
            id={f.Listing.id}
            title={`${f.Listing.brand} ${f.Listing.model}`}
            price={f.Listing.price}
            year={f.Listing.year}
            mileage={f.Listing.mileage}
            image={f.Listing.image}
            fuelType={f.Listing.fuelType}
            gearbox={f.Listing.gearbox}
            drive={f.Listing.drive}
            compact // 👈 важный флаг
          />
        ))}
      </div>
    </section>
  );
}
