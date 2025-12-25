import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const AdminRoute = observer(({ children }) => {
  const { user } = useContext(Context);

  if (!user.isAuth) return <Navigate to="/auth" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
});

export default AdminRoute;
