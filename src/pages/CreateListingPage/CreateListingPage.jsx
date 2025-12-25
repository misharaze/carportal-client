import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StepBasic from "../Steps/StepBasic";
import StepSpecs from "../Steps/StepSpecs";
import StepExterior from "../Steps/StepExterior";
import StepDescription from "../Steps/StepDescription";
import StepPhotos from "../Steps/StepPhotos";
import StepConfirm from "../Steps/StepConfirm";
import "./CreateListingPage.scss";

export default function CreateListingPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    engineVolume: "",
    power: "",
    fuelType: "",
    gearbox: "",
    drive: "",
    color: "",
    condition: "",
    description: "",
    vin: "",
  });

  const [images, setImages] = useState([]);

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const updateForm = (data) => {
    setForm({ ...form, ...data });
  };

  const submit = async () => {
    setLoading(true);
  
    const formData = new FormData();
  
    // Добавляем все поля
    Object.entries(form).forEach(([key, value]) => {
      const fixedValue = value === "" ? null : value;
      formData.append(key, fixedValue);
    });
  
    // Добавляем фото
    images.forEach(img => formData.append("image", img));
  
    const token = localStorage.getItem("token");
  
    try {
      const res = await fetch("http://localhost:5001/api/listings", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (res.ok) {
        toast.success("Объявление опубликовано!");
        navigate("/listings");
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Ошибка публикации");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ошибка сервера");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="wizard">

      {/* Навигация по шагам */}
      <div className="wizard__steps">
        {["Основное", "Характеристики", "Внешний вид", "Описание", "Фото", "Подтверждение"].map(
          (label, i) => (
            <div key={i} className={`step ${step === i + 1 ? "active" : ""}`}>
              {i + 1}. {label}
            </div>
          )
        )}
      </div>

      <div className="wizard__content">
        {step === 1 && <StepBasic next={next} form={form} update={updateForm} />}
        {step === 2 && <StepSpecs next={next} prev={prev} form={form} update={updateForm} />}
        {step === 3 && <StepExterior next={next} prev={prev} form={form} update={updateForm} />}
        {step === 4 && <StepDescription next={next} prev={prev} form={form} update={updateForm} />}
        {step === 5 && <StepPhotos next={next} prev={prev} setImages={setImages} images={images} />}
        {step === 6 && <StepConfirm prev={prev} submit={submit} form={form} images={images} />}
      </div>
    </div>
  );
}
