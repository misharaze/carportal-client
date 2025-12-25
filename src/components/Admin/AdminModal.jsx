import React, { useEffect } from "react";
import "./AdminModal.scss";

export default function AdminModal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Сохранить",
  cancelText = "Отмена",
  showFooter = true,
  size = "md", // sm | md | lg
  closeOnBackdrop = true
}) {
  // Закрытие по ESC
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass =
    size === "sm" ? "admin-modal__content--sm"
    : size === "lg" ? "admin-modal__content--lg"
    : "admin-modal__content--md";

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose?.();
    }
  };

  return (
    <div className="admin-modal" onClick={handleBackdropClick}>
      <div className={`admin-modal__content ${sizeClass}`}>
        <div className="admin-modal__header">
          <h3>{title}</h3>
          <button
            type="button"
            className="admin-modal__close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="admin-modal__body">
          {children}
        </div>

        {showFooter && (
          <div className="admin-modal__footer">
            <button
              type="button"
              className="admin-modal__btn admin-modal__btn--ghost"
              onClick={onClose}
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                type="button"
                className="admin-modal__btn admin-modal__btn--primary"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
