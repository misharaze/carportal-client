import { NavLink } from "react-router-dom";
import "./AdminSidebar.scss";

 function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__logo">🚗 Admin</div>

      <nav>
        <NavLink to="/admin" end>📊 Дашборд</NavLink>
        <NavLink to="/admin/listings">📋 Объявления</NavLink>
        <NavLink to="/admin/users">👥 Пользователи</NavLink>
         <NavLink to="/admin/create">➕ Создать объявление</NavLink>
        <NavLink to="/admin/stats">📈 Статистика</NavLink>
        <NavLink to="/admin/settings">⚙️ Настройки</NavLink>
      </nav>
    </aside>
  );
}
export default AdminSidebar;
