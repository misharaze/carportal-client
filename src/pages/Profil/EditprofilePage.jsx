import React, { useContext, useEffect, useState } from "react";
import "./EditProfilPage.scss";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { user: userStore } = useContext(Context);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    about: "",
    avatar: ""
  });

  // ✅ ЗАГРУЗКА ПРОФИЛЯ
  useEffect(() => {
    fetch("http://localhost:5001/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProfile(data.user))
      .catch(console.error);
  }, [token]);

  const change = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ СОХРАНЕНИЕ ПРОФИЛЯ (БЕЗ AVATAR)
  const save = async (e) => {
    e.preventDefault();

    const payload = {
      name: profile.name,
      phone: profile.phone,
      city: profile.city,
      about: profile.about
    };

    try {
      const res = await fetch("http://localhost:5001/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        toast.error("Ошибка сохранения");
        return;
      }

      toast.success("Профиль обновлён");
      navigate("/profile");
    } catch {
      toast.error("Сервер недоступен");
    }
  };

  // ✅ ЗАГРУЗКА АВАТАРА
  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("http://localhost:5001/api/user/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Ошибка загрузки");
        return;
      }

      // 🔥 МГНОВЕННО ОБНОВЛЯЕМ HEADER
      userStore.setAvatar(data.avatar);

      setProfile(prev => ({ ...prev, avatar: data.avatar }));
      toast.success("Аватар обновлён");
    } catch {
      toast.error("Сервер недоступен");
    }
  };

  return (
    <div className="edit">
      <div className="edit__card">
        <h1>Редактирование профиля</h1>

        <form onSubmit={save}>
          <label>Имя</label>
          <input name="name" value={profile.name || ""} onChange={change} />

          <label>Email</label>
          <input value={profile.email || ""} disabled />

          <label>Телефон</label>
          <input name="phone" value={profile.phone || ""} onChange={change} />

          <label>Город</label>
          <input name="city" value={profile.city || ""} onChange={change} />

          <label>О себе</label>
          <textarea name="about" value={profile.about || ""} onChange={change} />

          <label>Аватар</label>
          <input type="file" accept="image/*" onChange={uploadAvatar} />

          <button className="edit__save">Сохранить</button>
        </form>
      </div>
    </div>
  );
}
