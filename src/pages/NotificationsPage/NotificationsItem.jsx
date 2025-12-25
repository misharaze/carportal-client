import { FaBell, FaCheckCircle } from "react-icons/fa";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import "./NotificationsPage.scss"
export default function NotificationItem({ item, onRead }) {
  return (
    <div
      className={`notif-card ${item.isRead ? "read" : ""}`}
      onClick={() => onRead(item.id)}
    >
      <div className="notif-left">
        <FaBell className="notif-icon" />

        <div className="notif-texts">
          <p className="notif-text">{item.text}</p>

          <span className="notif-date">
            {format(new Date(item.createdAt), "d MMMM yyyy, HH:mm", {
              locale: ru
            })}
          </span>
        </div>
      </div>

      {!item.isRead && <FaCheckCircle className="notif-check" />}
    </div>
  );
}
