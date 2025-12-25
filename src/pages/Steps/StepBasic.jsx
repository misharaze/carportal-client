import React, { useState } from "react";
import "../../pages/CreateListingPage/CreateListingPage.scss"
import Button from "../../components/ui/Button/Button";
export default function StepBasic({ next, form, update }) {
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
      <h2 className="title">Основная информация</h2>

      <input placeholder="Марка" name="brand" value={local.brand} onChange={change} />
      <input placeholder="Модель" name="model" value={local.model} onChange={change} />
      <input placeholder="Год выпуска" name="year" type="number" value={local.year} onChange={change} />
      <input placeholder="Цена (€)" name="price" type="number" value={local.price} onChange={change} />

      <Button onClick={goNext} className="next-btn">Продолжить →</Button>
    </div>
  );
}
