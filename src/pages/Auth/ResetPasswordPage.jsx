import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import "./ResetPasswordPage.scss";
import { API_URL } from "../../config/api";
export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    });

    if (res.ok) {
      toast.success("🔐 Пароль изменён");
      navigate("/auth");
    } else {
      toast.error("Ссылка недействительна");
    }
  };

  return (
    <div className="reset">
      <form className="reset__card" onSubmit={submit}>
        <h2>Сменить пароль</h2>
        <input
          type="password"
          placeholder="Новый пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="primary">Сохранить</button>
      </form>
    </div>
  );
}
