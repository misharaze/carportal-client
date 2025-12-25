import { createContext, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

export const AuthContext = createContext(null);

const AuthProvider = observer(({ children }) => {
  const { user } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || user.isAuth) return;

    (async () => {
      try {
        const res = await fetch("http://localhost:5001/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();

        user.login({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar,
        });

      } catch (e) {
        console.warn("Auth restore skipped");
      }
    })();
  }, [user]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
});

export default AuthProvider;
