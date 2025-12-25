import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const ProtectedRoute = observer(({ children }) => {
  const { user } = useContext(Context);
  return user.isAuth ? children : <Navigate to="/auth" />;
});

export default ProtectedRoute;
