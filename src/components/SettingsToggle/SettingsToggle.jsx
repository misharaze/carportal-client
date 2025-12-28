export default function SettingToggle({ title, desc, value, onChange }) {
  return (
    <div className="settings-row">
      <div className="settings-row__text">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider" />
      </label>
    </div>
  );
}
