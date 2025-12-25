import { useEffect, useState } from "react";
import "./StatsPage.scss";
import { API_URL } from "../../config/api.js";

export default function AdminStatsPage() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);
  if (!stats) return <p>Загрузка статистики...</p>;

  return (
    <div className="admin-stats fade-in">
      <div className="admin-stats__header">
        <div>
          <h1>Статистика портала</h1>
          <p>Актуальные данные в реальном времени</p>
        </div>
      </div>

      <div className="admin-stats__grid">
        <div className="admin-stats__card admin-stats__card--wide">
          <h3>Общая сводка</h3>

          <div className="admin-stats__summary-grid">
            <div>
              <span>Пользователи</span>
              <strong>{stats.users}</strong>
            </div>

            <div>
              <span>Объявления</span>
              <strong>{stats.listings}</strong>
            </div>

            <div>
              <span>Активны сегодня</span>
              <strong>{stats.activeToday}</strong>
            </div>

            <div>
              <span>Продано за месяц</span>
              <strong>{stats.soldThisMonth}</strong>
            </div>

            <div>
              <span>Средняя цена</span>
              <strong>{stats.avgPrice} €</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
