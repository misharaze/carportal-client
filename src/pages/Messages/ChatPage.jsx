// pages/Messages/ChatPage.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import "./chatPage.scss";

export default function ChatPage() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  // загрузка сообщений
  const load = async () => {
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!res.ok) return;

      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error("Ошибка загрузки сообщений", e);
    }
  };

  // первичная загрузка
  useEffect(() => {
    load();
  }, [id]);

  // автоскролл вниз
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // отправка сообщения
  const send = async () => {
    if (!text.trim()) return;

    try {
      await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          conversationId: id,
          text
        })
      });

      setText("");
      load();
    } catch (e) {
      console.error("Ошибка отправки", e);
    }
  };

  return (
    <div className="chat">
      <div className="chat__messages">
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
          placeholder="Введите сообщение..."
        />
        <button onClick={send}>Отправить</button>
      </div>
    </div>
  );
}
