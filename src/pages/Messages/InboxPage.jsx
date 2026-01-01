// pages/Messages/InboxPage.jsx
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { Link } from "react-router-dom";

export default function InboxPage() {
  const [conversations, setConversations] = useState([]);

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
    <div className="inbox">
      <h1>Сообщения</h1>
{conversations.length === 0 && (
  <p className="empty">Пока нет диалогов</p>
)}

{conversations.map(c => (
  <Link
    key={c.id}
    to={`/messages/${c.id}`}
    className={`chat-row ${c.unreadCount > 0 ? "unread" : ""}`}
  >
    <div className="chat-row__title">
      {c.otherUser?.name || "Пользователь"}
    </div>

    <div className="chat-row__last">
      {c.lastMessage || "Нет сообщений"}
    </div>

    {c.unreadCount > 0 && (
      <span className="badge">{c.unreadCount}</span>
    )}
  </Link>
))}

    </div>
  );
}
