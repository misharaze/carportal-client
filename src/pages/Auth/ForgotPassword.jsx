import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5001/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    toast.success("Если email существует — письмо отправлено");
  };

  return (
    <div className="auth__card">
      <h2>Восстановление пароля</h2>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button>Отправить ссылку</button>
      </form>
    </div>
  );
}
