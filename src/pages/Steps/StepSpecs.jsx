import React, { useState } from "react";
import "../../pages/CreateListingPage/CreateListingPage.scss"
import Button from "../../components/ui/Button/Button";
export default function StepSpecs({ next, prev, form, update }) {
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
      <h2 className="title">Характеристики автомобиля</h2>

      <input name="mileage" type="number" placeholder="Пробег (км)" value={local.mileage} onChange={change} />
      <input name="engineVolume" placeholder="Объем двигателя" value={local.engineVolume} onChange={change} />
      <input name="power" placeholder="Мощность (л.с.)" value={local.power} onChange={change} />
      <input name="fuelType" placeholder="Тип топлива" value={local.fuelType} onChange={change} />
      <input name="gearbox" placeholder="Коробка передач" value={local.gearbox} onChange={change} />
      <input name="drive" placeholder="Привод" value={local.drive} onChange={change} />

      <div className="nav-buttons">
        <Button onClick={prev}>← Назад</Button>
        <Button onClick={goNext} className="next-btn">Продолжить →</Button>
      </div>
    </div>
  );
}
