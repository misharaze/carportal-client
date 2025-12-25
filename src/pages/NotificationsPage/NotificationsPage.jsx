import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import NotificationItem from "./NotificationsItem.jsx";

import "./NotificationsPage.scss";

export default observer(function NotificationsPage() {
  const { notification } = useContext(Context);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    notification.load();
  }, []);

  const filtered = notification.notifications.filter(n => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  return (
    <div className="notif-page">
      <div className="notif-wrapper">

        {/* HEADER */}
        <div className="notif-header">
          <h1>Уведомления</h1>
          <p>Все важные события вашего аккаунта</p>
        </div>

        {/* FILTERS */}
        <div className="notif-toolbar">
          <div className="filters">
            <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
              Все
            </button>
            <button className={filter === "unread" ? "active" : ""} onClick={() => setFilter("unread")}>
              Непрочитанные
            </button>
            <button className={filter === "read" ? "active" : ""} onClick={() => setFilter("read")}>
              Прочитанные
            </button>
          </div>

          <div className="actions">
            <button onClick={() => notification.notifications.forEach(n => notification.read(n.id))}>
              Отметить все
            </button>
            <button className="danger" onClick={() => notification.clear()}>
              Очистить
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="notif-list">
          {filtered.length === 0 ? (
            <div className="notif-empty">
              🔔 <p>Уведомлений пока нет</p>
            </div>
          ) : (
            filtered.map(item => (
              <NotificationItem
                key={item.id}
                item={item}
                onRead={notification.read}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
});
