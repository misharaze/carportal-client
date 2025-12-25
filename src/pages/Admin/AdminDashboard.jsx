import { useEffect, useState } from "react";
import AdminCard from "../../components/Admin/AdminCard.jsx";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5001/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setStats)
      .catch(() => setStats(false));
  }, []);

  if (!stats) return <p style={{ color: "white" }}>Загрузка...</p>;

  return (
    <>
      <h1>Дашборд</h1>

      <div className="admin-dashboard__grid">
        <AdminCard title="Пользователи" value={stats.totalUsers} />
        <AdminCard title="Объявления" value={stats.totalListings} />
        <AdminCard title="Активные" value={stats.activeListings} />
        <AdminCard title="На модерации" value={stats.pendingListings} />
      </div>
    </>
  );
}
