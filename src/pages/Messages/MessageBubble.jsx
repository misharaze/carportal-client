import "./MessageBubble.scss";

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`message-bubble ${isOwn ? "own" : "other"}`}>
      <div className="message-bubble__content">
        <p>{message.text}</p>

        <div className="message-bubble__meta">
          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>

          {isOwn && (
            <span className="status">
              {message.read ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
