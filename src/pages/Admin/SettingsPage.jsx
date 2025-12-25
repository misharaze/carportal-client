import React, { useState } from "react";
import "./SettingsPage.scss";

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [logLevel, setLogLevel] = useState("info");
  const [theme, setTheme] = useState("dark");

  const handleSave = (e) => {
    e.preventDefault();
    // тут можно сделать запрос на бэк
    console.log({
      maintenance,
      allowRegistration,
      emailNotifications,
      logLevel,
      theme
    });
    alert("Настройки сохранены (пока только в консоли)");
  };

  return (
    <div className="admin-settings fade-in">
      <div className="admin-settings__header">
        <div>
          <h1>Настройки портала</h1>
          <p>Глобальные параметры работы автомобильного портала</p>
        </div>
      </div>

      <form className="admin-settings__content" onSubmit={handleSave}>
        <section>
          <h2>Режим работы</h2>
          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Техническое обслуживание</h4>
              <p>
                Перевести сайт в режим обслуживания. Пользователи увидят
                страницу “Сервис временно недоступен”.
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={maintenance}
                onChange={(e) => setMaintenance(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Регистрация пользователей</h4>
              <p>Разрешить создание новых аккаунтов на портале.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>
        </section>

        <section>
          <h2>Уведомления и логи</h2>

          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Email-уведомления</h4>
              <p>Отправлять системные уведомления администраторам по email.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Уровень логирования</h4>
              <p>Выберите, сколько подробностей писать в логи.</p>
            </div>
            <select
              value={logLevel}
              onChange={(e) => setLogLevel(e.target.value)}
            >
              <option value="error">Только ошибки</option>
              <option value="warn">Предупреждения и ошибки</option>
              <option value="info">Инфо + предупреждения + ошибки</option>
              <option value="debug">Debug (максимум деталей)</option>
            </select>
          </div>
        </section>

        <section>
          <h2>Внешний вид</h2>

          <div className="settings-row">
            <div className="settings-row__text">
              <h4>Тема админки</h4>
              <p>Выберите основной режим отображения панели администратора.</p>
            </div>
            <div className="settings-row__options">
              <button
                type="button"
                className={
                  "theme-btn " + (theme === "dark" ? "theme-btn--active" : "")
                }
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
              <button
                type="button"
                className={
                  "theme-btn " + (theme === "light" ? "theme-btn--active" : "")
                }
                onClick={() => setTheme("light")}
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
