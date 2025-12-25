import React from "react";
import "./ContactPage.scss";

export default function ContactPage() {
  return (
    <div className="contact">
      <div className="contact__container">
        <h1>Получить консультацию</h1>
        <p>
          Оставьте заявку — мы свяжемся с вами и подберём лучший автомобиль
        </p>

        <form className="contact__form">
          <input type="text" placeholder="Ваше имя" />
          <input type="tel" placeholder="Телефон" />
          <input type="email" placeholder="Email (необязательно)" />
          <textarea placeholder="Комментарий или пожелания" rows="4" />

          <button type="submit">Отправить заявку</button>
        </form>
      </div>
    </div>
  );
}
