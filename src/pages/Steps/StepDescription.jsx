import React, { useState } from "react";
import "../../pages/CreateListingPage/CreateListingPage.scss"
import Button from "../../components/ui/Button/Button";
export default function StepDescription({ next, prev, form, update }) {
  const [local, setLocal] = useState(form);

  const goNext = () => {
    update(local);
    next();
  };

  return (
    <div className="step-card">
      <h2 className="title">Описание автомобиля</h2>

      <textarea
        name="description"
        placeholder="Подробное описание автомобиля"
        value={local.description}
        onChange={(e) => setLocal({ ...local, description: e.target.value })}
      />

      <div className="nav-buttons">
        <Button onClick={prev}>← Назад</Button>
        <Button onClick={goNext} className="next-btn">Продолжить →</Button>
      </div>
    </div>
  );
}
