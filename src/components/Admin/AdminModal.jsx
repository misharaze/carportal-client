import { useEffect } from "react";
import "./ConfirmModal.scss";

export default function AdminModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  type = "info"
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="confirm-backdrop" onClick={onClose}>
      <div
        className={`confirm-modal ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-header">
          <div className={`icon ${type}`} />
          <h3>{title}</h3>
        </div>

        {description && (
          <p className="confirm-desc">{description}</p>
        )}

        <div className="confirm-actions">
          <button className="btn ghost" onClick={onClose}>
            {cancelText}
          </button>

          <button className={`btn solid ${type}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
