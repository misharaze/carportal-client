import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import "./Messages.scss";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/messages/conversations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(r => r.json())
      .then(setConversations);
  }, []);

  return (
    <div className="messages-layout">
      <h1>Сообщения</h1>

      <div className="conversation-list">

{conversations.length === 0 && (
  <div className="messages-empty">
    <div className="messages-empty__icon">💬</div>

    <h3>У вас пока нет сообщений</h3>

    <p>
      Напишите продавцу под объявлением, чтобы начать диалог.
    </p>

    <button
      className="messages-empty__btn"
      onClick={() => navigate("/listings")}
    >
      Перейти к объявлениям
    </button>
  </div>
)}

        

        {conversations.map(c => (
          <div
            key={c.id}
            className={`conversation ${c.unreadCount > 0 ? "unread" : ""}`}
            onClick={() => navigate(`/messages/${c.id}`)}
          >
            <div className="conversation__title">
              {c.otherUser?.name || "Пользователь"}
            </div>

            <div className="conversation__last">
              {c.lastMessage || "Нет сообщений"}
            </div>

            {c.unreadCount > 0 && (
              <span className="badge">{c.unreadCount}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
