import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./AuthPage.scss";
import { Context } from "../../index";
import Button from "../../components/ui/Button/Button";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
  
    // 🔐 FORGOT PASSWORD
    if (mode === "forgot") {
      const res = await fetch("http://localhost:5001/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email })
      });
  
      if (res.ok) {
        toast.success("📩 Если email существует — письмо отправлено");
        setMode("login");
      } else {
        toast.error("Ошибка отправки");
      }
      return;
    }
  
    // 🔐 LOGIN / REGISTER
    const url =
      mode === "login"
        ? "http://localhost:5001/api/auth/login"
        : "http://localhost:5001/api/auth/register";
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        toast.error(data.error || "Ошибка");
        return;
      }
  
      localStorage.setItem("token", data.token);
  
      const profileRes = await fetch("http://localhost:5001/api/user/profile", {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      });
  
      const profile = await profileRes.json();
      
      console.log("PROFILE FROM SERVER:", profile);

      user.login({
        id: profile.user.id,
        email: profile.user.email,
        role: profile.user.role,
        avatar: profile.user.avatar
      });
  
      toast.success("✅ Успешный вход!");
      localStorage.setItem("token", data.token);
      navigate("/");
      
  
    } catch (e) {
      toast.error("Сервер недоступен");
    }
  };
  
 

  return (
  
      <div className="auth-split">
        {/* LEFT — VISUAL */}
        <div className="auth-split__visual">
          <div className="auth-visual__content">
            <h1>CarPortal</h1>
            <p>
              Премиальная платформа объявлений.
              <br />
              Надёжно. Быстро. Современно.
            </p>
          </div>
        </div>
    
        {/* RIGHT — FORM */}
        <div className="auth-split__form">
          <div className="auth__card">
           
          <div className="auth__tabs">
  <button
    className={mode === "login" ? "active" : ""}
    onClick={() => setMode("login")}
  >
    Вход
  </button>

  <button
    className={mode === "register" ? "active" : ""}
    onClick={() => setMode("register")}
  >
    Регистрация
  </button>

  <span
    className={`auth__tabs-indicator ${
      mode === "register" ? "right" : "left"
    }`}
  />
</div>



    
            <form className="auth__form" onSubmit={submit}>
              <h2>
                {mode === "login" && "Добро пожаловать"}
                {mode === "register" && "Создать аккаунт"}
                {mode === "forgot" && "Восстановление пароля"}
              </h2>
    
              {mode === "register" && (
                <input
                  name="name"
                  placeholder="Имя"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              )}
    
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
    
              {mode !== "forgot" && (
                <input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              )}
    
              {mode === "login" && (
                <button
                  type="button"
                  className="auth__forgot"
                  onClick={() => setMode("forgot")}
                >
                  Забыли пароль?
                </button>
              )}
    
              <button type="submit" className="auth__btn">
                {mode === "login" && "Войти"}
                {mode === "register" && "Зарегистрироваться"}
                {mode === "forgot" && "Отправить ссылку"}
              </button>
    
              {mode === "forgot" && (
                <Button
                  type="button"
                  className="auth__back"
                  onClick={() => setMode("login")}
                >
                  ← Назад ко входу
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
    
}
