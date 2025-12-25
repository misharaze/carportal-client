import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminTopbar from "../../components/Admin/AdminTopBar";
import "./AdminLayout.scss";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-layout__main">
        <AdminTopbar />
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
