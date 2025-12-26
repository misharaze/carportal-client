import { useEffect } from "react";
import "./Modal.scss";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ui-modal-backdrop" onClick={onClose}>
      <div
        className="ui-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ui-modal__header">
          <h3>{title}</h3>
          <button className="ui-modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="ui-modal__content">
          {children}
        </div>
      </div>
    </div>
  );
}
