import Button from "../../components/ui/Button/Button";
import "../../pages/CreateListingPage/CreateListingPage.scss"
import React, { useState } from "react";

export default function StepConfirm({ prev, submit, form, images }) {

  const [loading, setLoading] = useState(false);

    return (
      <div className="step-card">
        <h2 className="title">Проверьте данные</h2>
  
        <pre>{JSON.stringify(form, null, 2)}</pre>
  
        <div className="photo-preview small">
          {images.map((img, i) => (
            <img key={i} src={URL.createObjectURL(img)} alt="" />
          ))}
        </div>
  
        <div className="nav-buttons">
          <Button onClick={prev}>← Назад</Button>
        
          <Button
  onClick={submit}
  className="publish-btn"
  disabled={loading}
>
  {loading ? (
    <div className="spinner"></div>
  ) : (
    "Опубликовать"
  )}
</Button>



        </div>
      </div>
    );
  }
  