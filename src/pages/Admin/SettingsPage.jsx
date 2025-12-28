import React, { useEffect, useState } from "react";
import "./SettingsPage.scss";
import { API_URL } from "../../config/api";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
    setTheme(saved);
  }
}, []);

useEffect(() => {
  fetch(`${API_URL}/api/admin/settings`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(r => r.json())
    .then(data => {
      setMaintenance(data.maintenance);
      setAllowRegistration(data.allowRegistration);
      setEmailNotifications(data.emailNotifications);
      setLogLevel(data.logLevel);
    });
}, []);

const handleSave = async (e) => {
  e.preventDefault();

  await fetch(`${API_URL}/api/admin/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      maintenance,
      allowRegistration,
      emailNotifications,
      logLevel
    })
  });

  alert("Настройки сохранены");
};



  const [settings, setSettings] = useState({
    maintenance: false,
    allowRegistration: true,
    emailNotifications: true,
    logLevel: "info",
    theme: "dark"
  });

  // ✅ загрузка при входе
  useEffect(() => {
    fetch(`${API_URL}/api/admin/settings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Ошибка загрузки настроек");
        setLoading(false);
      });
  }, []);

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

const changeTheme = (value) => {
  setTheme(value);
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
};





  if (loading) return <div className="admin-settings">Загрузка...</div>;

  return (
    <div className="admin-settings fade-in">
      <div className="admin-settings__header">
        <h1>Настройки портала</h1>
        <p>Глобальные параметры работы системы</p>
      </div>

      <form className="admin-settings__content" onSubmit={handleSave}>

        {/* --- РЕЖИМ --- */}
        <section>
          <h2>Режим работы</h2>

          <SettingToggle
            title="Техническое обслуживание"
            desc="Сайт станет недоступен для пользователей"
            value={settings.maintenance}
            onChange={v => update("maintenance", v)}
          />

          <SettingToggle
            title="Регистрация пользователей"
            desc="Разрешить создание аккаунтов"
            value={settings.allowRegistration}
            onChange={v => update("allowRegistration", v)}
          />
        </section>

        {/* --- УВЕДОМЛЕНИЯ --- */}
        <section>
          <h2>Уведомления</h2>

          <SettingToggle
            title="Email уведомления"
            desc="Отправлять системные уведомления"
            value={settings.emailNotifications}
            onChange={v => update("emailNotifications", v)}
          />

          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Уровень логирования</h4>
              <p>Глубина логов сервера</p>
            </div>

            <select
              value={settings.logLevel}
              onChange={e => update("logLevel", e.target.value)}
            >
              <option value="error">Ошибки</option>
              <option value="warn">Предупреждения</option>
              <option value="info">Информация</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </section>

        {/* --- ВНЕШНИЙ ВИД --- */}
        <section>
          <h2>Внешний вид</h2>

          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Тема панели</h4>
              <p>Оформление административной части</p>
            </div>

            <div className="settings-row__options">
             <button
  type="button"
  className={`theme-btn ${theme === "dark" ? "theme-btn--active" : ""}`}
  onClick={() => changeTheme("dark")}
>
  Dark
</button>

             <button
  type="button"
  className={`theme-btn ${theme === "light" ? "theme-btn--active" : ""}`}
  onClick={() => changeTheme("light")}
>
  Light
</button>
            </div>
          </div>
        </section>

        <div className="admin-settings__actions">
          <button type="submit" className="admin-settings__btn">
            Сохранить настройки
          </button>
        </div>
      </form>
    </div>
  );
}

/* маленький компонент */
function SettingToggle({ title, desc, value, onChange }) {
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
          onChange={e => onChange(e.target.checked)}
        />
        <span className="slider" />
      </label>
    </div>
  );
}
