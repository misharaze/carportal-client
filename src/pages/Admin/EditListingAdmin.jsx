import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminModal from "../../components/admin/AdminModal.jsx";
import "./AdminEditListingPage.scss";

const API_URL = "http://localhost:5001";

export default function AdminEditListingPage() {
  const { id } = useParams();        // /admin/listings/:id/edit
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
    description: ""
  });

  // загрузка объявления
  useEffect(() => {
    const loadListing = async () => {
      try {
        const res = await fetch(`${API_URL}/api/listings?page=1&limit=1&id=${id}`);
        // если у тебя нет фильтра по id на бэке, лучше сделать отдельный GET /api/listings/:id
        // пока сделаем проще: GET /api/listings и найдём по id (не лучший вариант, но рабочий мок)
        const allRes = await fetch(`${API_URL}/api/listings`);
        const data = await allRes.json();

        const list = data.items || data; // зависит от того, что возвращает бэк
        const found = Array.isArray(list)
          ? list.find((l) => String(l.id) === String(id))
          : null;

        if (!found) {
          toast.error("Объявление не найдено");
          navigate("/admin/listings");
          return;
        }

        setForm({
          brand: found.brand || "",
          model: found.model || "",
          year: found.year || "",
          price: found.price || "",
          mileage: found.mileage || "",
          engineVolume: found.engineVolume || "",
          power: found.power || "",
          fuelType: found.fuelType || "",
          gearbox: found.gearbox || "",
          drive: found.drive || "",
          color: found.color || "",
          condition: found.condition || "",
          description: found.description || ""
        });

        if (found.image) {
          setImagePreview(found.image);
        }
      } catch (e) {
        console.error(e);
        toast.error("Ошибка загрузки объявления");
        navigate("/admin/listings");
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`${API_URL}/api/listings/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Ошибка сохранения");
      }

      toast.success("Объявление обновлено");
      navigate("/admin/listings");
    } catch (e) {
      console.error(e);
      toast.error(e.message || "Ошибка обновления");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-edit fade-in">
        <div className="admin-edit__loading">Загрузка объявления…</div>
      </div>
    );
  }

  return (
    <div className="admin-edit fade-in">
      <div className="admin-edit__header">
        <div>
          <h1>Редактирование объявления #{id}</h1>
          <p>Измените данные объявления и сохраните изменения</p>
        </div>
        <button
          type="button"
          className="admin-edit__back"
          onClick={() => navigate("/admin/listings")}
        >
          ← Назад к списку
        </button>
      </div>

      <div className="admin-edit__content">
        <form className="admin-edit__form" onSubmit={handleSave}>
          <section>
            <h2>Основная информация</h2>
            <div className="admin-edit__grid">
              <div className="field">
                <label>Марка</label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label>Модель</label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label>Год</label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Цена (€)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Пробег (км)</label>
                <input
                  type="number"
                  name="mileage"
                  value={form.mileage}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Объём двигателя</label>
                <input
                  name="engineVolume"
                  value={form.engineVolume}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Мощность (л.с.)</label>
                <input
                  name="power"
                  value={form.power}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Тип топлива</label>
                <input
                  name="fuelType"
                  value={form.fuelType}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Коробка</label>
                <input
                  name="gearbox"
                  value={form.gearbox}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Привод</label>
                <input
                  name="drive"
                  value={form.drive}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Цвет</label>
                <input
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Состояние</label>
                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                >
                  <option value="">Не указано</option>
                  <option value="new">Новый</option>
                  <option value="used">Б/у</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2>Описание</h2>
            <div className="field">
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Подробное описание автомобиля, комплектация, состояние, история обслуживания…"
              />
            </div>
          </section>

          <section>
            <h2>Фотография</h2>
            <div className="admin-edit__image-block">
              <div className="admin-edit__image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <div className="admin-edit__image-placeholder">
                    Нет картинки
                  </div>
                )}
              </div>
              <label className="admin-edit__image-upload">
                Заменить фото
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </section>

          <div className="admin-edit__actions">
            <button
              type="button"
              className="admin-edit__btn admin-edit__btn--ghost"
              onClick={() => navigate("/admin/listings")}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="admin-edit__btn admin-edit__btn--primary"
              disabled={saving}
            >
              {saving ? "Сохранение…" : "Сохранить изменения"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
