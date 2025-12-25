import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../index";
import "./NotificationDropdown.scss";
import { Link } from "react-router-dom";


export default observer(function NotificationDropdown({closing}) {
  const { notification } = useContext(Context);


  return (
    <div className={`notif-box ${closing ? "closing" : ""}`}>
      <div className="notif-box__header">
        <span>Уведомления</span>
        <button onClick={() => notification.clear()}>Очистить</button>
      </div>

      <div className="notif-box__list">
        {notification.notifications.length === 0 && (
          <p>Нет уведомлений</p>
        )}

        {notification.notifications.map(n => (
          <div
            key={n.id}
            className={`notif-item ${n.isRead ? "read" : ""}`}
            onClick={() => notification.read(n.id)}
          >
            {n.text}
          </div>
        ))}
      </div>

      <div className="notif-box__footer">
      <Link to="/notifications">Открыть все →</Link>
      </div>
    </div>
  );
});
