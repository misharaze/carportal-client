import "./Modal.scss";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="ui-modal__backdrop" onClick={onClose}>
      <div className="ui-modal" onClick={(e) => e.stopPropagation()}>
        <header>{title}</header>
        <div className="ui-modal__content">{children}</div>
      </div>
    </div>
  );
}
