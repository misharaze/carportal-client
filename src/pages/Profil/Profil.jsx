import React, { useEffect, useState } from "react";
import "./Profil.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
export default function ProfilePage() {
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(resData => {
        // 👑 ЕСЛИ АДМИН — В АДМИНКУ
        if (resData.user.role === "admin") {
          navigate("/admin", { replace: true });
          return;
        }

        setData(resData);
      })
      .catch(console.error);
  }, [location.pathname, navigate]);

  if (!data) return <p>Загрузка...</p>;

  const { user, stats, listings } = data;

  return (
   
      <div className="profile">
        <div className="profile__container">
    
          {/* SIDEBAR */}
          <aside className="profile__sidebar">
          <img
  src={
    user.avatar
      ? `${API_URL}{user.avatar}`
      : "/avatar-placeholder.png"
  }
  className="profile__avatar"
/>
    
            <h2>{user.name}</h2>
            <p className="profile__email">{user.email}</p>
    
            <div className="profile__info">
              <div>
                <span>Телефон:</span>
                <p>{user.phone || "Не указан"}</p>
              </div>
    
              <div>
                <span>Город:</span>
                <p>{user.city || "Не указан"}</p>
              </div>
    
              <div>
                <span>О себе:</span>
                <p>{user.about || "Не заполнено"}</p>
              </div>
            </div>
    
            <div className="profile__stats">
              <div><span>{stats.listings}</span> Объявлений</div>
              <div><span>{stats.favorites}</span> В избранном</div>
              <div><span>{stats.lastMonth}</span> За 30 дней</div>
            </div>
    
            <button
              className="profile__edit-btn"
              onClick={() => navigate("/profile/edit")}
            >
              Редактировать профиль
            </button>
          </aside>
    
          {/* CONTENT */}
          <div className="profile__content">
            <h1>Личный кабинет</h1>
    
            <div className="profile__section">
              <h3>Мои объявления</h3>
    
              <div className="profile__listing-list">
                {listings.length === 0 && <p>У вас пока нет объявлений</p>}
    
                {listings.map(item => (
                  <div key={item.id} className="profile__listing">
                    {item.brand} {item.model} — {item.price} €
                  </div>
                ))}
              </div>
            </div>
          </div>
    
        </div>
      </div>
  );
}
    