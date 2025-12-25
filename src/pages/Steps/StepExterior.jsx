import React, { useState } from "react";
import "../../pages/CreateListingPage/CreateListingPage.scss"
import Button from "../../components/ui/Button/Button";
export default function StepExterior({ next, prev, form, update }) {
  const [local, setLocal] = useState(form);

  const change = (e) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
  };

  const goNext = () => {
    update(local);
    next();
  };

  return (
    <div className="step-card">
      <h2 className="title">Внешний вид</h2>

      <input name="color" placeholder="Цвет" value={local.color} onChange={change} />
      <input name="condition" placeholder="Состояние" value={local.condition} onChange={change} />
      <input name="vin" placeholder="VIN номер" value={local.vin} onChange={change} />

      <div className="nav-buttons">
        <Button onClick={prev}>← Назад</Button>
        <Button onClick={goNext} className="next-btn">Продолжить →</Button>
      </div>
    </div>
  );
}
