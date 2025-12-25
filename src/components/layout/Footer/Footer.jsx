import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* BRAND */}
        <div className="footer__brand">
          <h3>CarPortal</h3>
          <p>
            Премиальная платформа автомобильных объявлений.
            Надёжно. Современно. Удобно.
          </p>
        </div>

        {/* NAV */}
        <div className="footer__column">
          <h4>Навигация</h4>
          <a href="/">Главная</a>
          <a href="/listings">Объявления</a>
          <a href="/brands">Каталог брендов</a>
        </div>

        {/* SERVICE */}
        <div className="footer__column">
          <h4>Сервис</h4>
          <a href="/auth">Вход</a>
          <a href="/profile">Профиль</a>
          <a href="/">Поддержка</a>
        </div>

        {/* CONTACT */}
        <div className="footer__column">
          <h4>Контакты</h4>
          <a href="mailto:support@carportal.com">
            support@carportal.com
          </a>
          <div className="footer__socials">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer__bottom">
        <span>© 2025 CarPortal</span>
        <div className="footer__legal">
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>
      </div>
    </footer>
  );
}
