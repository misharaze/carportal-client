import AdminCard from "./AdminCard";
import "./AdminTopBar.scss";

 function AdminTopbar() {
  const userName = localStorage.getItem("userName") || "Admin";

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__title">Панель администратора</div>
      <div className="admin-topbar__right">
        <span className="admin-topbar__user">👤 {userName}</span>
      </div>
    </header>
  );
}
export default AdminTopbar;
