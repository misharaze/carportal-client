import "./AdminCard.scss";

export default function AdminCard({ title, value, subtitle }) {
  return (
    <div className="admin-card">
      <div className="admin-card__title">{title}</div>
      <div className="admin-card__value">{value}</div>
      {subtitle && <div className="admin-card__subtitle">{subtitle}</div>}
    </div>
  );
}
