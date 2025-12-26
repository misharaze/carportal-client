import React, { useEffect } from "react";
import "./AdminModal.scss";

export default function AdminModal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  showFooter = true,
  size = "md",
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={closeOnBackdrop ? onClose : undefined}>
      <div
        className={`modal-card modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">{children}</div>

        {showFooter && (
          <div className="modal-footer">
            <button className="btn ghost" onClick={onClose}>
              {cancelText}
            </button>

            {onConfirm && (
              <button className="btn primary" onClick={onConfirm}>
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
