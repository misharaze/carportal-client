import React, { useEffect, useState } from "react";
import "./SettingsPage.scss";
import { API_URL } from "../../config/api";
import toast from "react-hot-toast";
import SettingToggle from "../../components/SettingsToggle/SettingsToggle";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    maintenance: false,
    allowRegistration: true,
    emailNotifications: true,
    logLevel: "info",
    theme: "dark"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/settings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        document.documentElement.setAttribute("data-theme", data.theme);
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (key, value) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const changeTheme = (value) => {
    update("theme", value);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/admin/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(settings)
    });

    toast.success("Настройки сохранены");
  };

  if (loading) return <div className="admin-settings">Загрузка...</div>;

  return (
    <div className="admin-settings fade-in">
      <form className="admin-settings__content" onSubmit={handleSave}>

        <section>
          <h2>Режим работы</h2>

          <SettingToggle
            title="Техническое обслуживание"
            desc="Сайт временно недоступен"
            value={settings.maintenance}
            onChange={v => update("maintenance", v)}
          />

          <SettingToggle
            title="Регистрация"
            desc="Разрешить регистрацию пользователей"
            value={settings.allowRegistration}
            onChange={v => update("allowRegistration", v)}
          />
        </section>

        <section>
          <h2>Уведомления</h2>

          <SettingToggle
            title="Email уведомления"
            desc="Отправка писем администраторам"
            value={settings.emailNotifications}
            onChange={v => update("emailNotifications", v)}
          />

          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Уровень логов</h4>
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

        <section>
          <h2>Тема</h2>

          <div className="settings-row__options">
            <button
              type="button"
              className={`theme-btn ${settings.theme === "dark" ? "theme-btn--active" : ""}`}
              onClick={() => changeTheme("dark")}
            >
              Dark
            </button>

            <button
              type="button"
              className={`theme-btn ${settings.theme === "light" ? "theme-btn--active" : ""}`}
              onClick={() => changeTheme("light")}
            >
              Light
            </button>
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
