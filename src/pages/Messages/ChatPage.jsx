// pages/Messages/ChatPage.jsx
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import "./chatPage.scss";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);
  const token = localStorage.getItem("token");

  /* =========================
     ЗАГРУЗКА СООБЩЕНИЙ
  ========================= */
  const loadMessages = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка загрузки диалога");
        return;
      }

      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Ошибка загрузки сообщений:", err);
      setError("Сервер недоступен");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ПЕРВИЧНАЯ ЗАГРУЗКА
  ========================= */
  useEffect(() => {
    loadMessages();
  }, [id]);

  /* =========================
     АВТОСКРОЛЛ ВНИЗ
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     ОТПРАВКА СООБЩЕНИЯ
  ========================= */
  const sendMessage = async () => {
    if (!text.trim() || !token) return;

    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          conversationId: id,
          text
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Ошибка отправки сообщения");
        return;
      }

      setText("");
      await loadMessages();

    } catch (err) {
      console.error("Ошибка отправки сообщения:", err);
      alert("Сервер недоступен");
    }
  };

  /* =========================
     RENDER
  ========================= */
  if (loading) {
    return <div className="chat chat--loading">Загрузка диалога…</div>;
  }

  if (error) {
    return (
      <div className="chat chat--error">
        <p>{error}</p>
        <button onClick={() => navigate("/messages")}>
          ← Назад к диалогам
        </button>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.length === 0 && (
          <div className="chat__empty">
            Пока нет сообщений. Напишите первым 👋
          </div>
        )}

        {messages.map(m => (
          <div
            key={m.id}
            className={`bubble ${m.isMine ? "mine" : ""}`}
          >
            <div className="text">{m.text}</div>
            <span className="time">
              {new Date(m.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      <div className="chat__input">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Введите сообщение…"
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}
