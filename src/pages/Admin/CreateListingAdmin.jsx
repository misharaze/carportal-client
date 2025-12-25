import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button/Button";
import "./CreateListingAdmin.scss";
import { API_URL } from "../../config/api";


export default function CreateListingAdmin() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    price: "",
    mileage: ""
  });

  /* ===== ЗАГРУЗКА ПОЛЬЗОВАТЕЛЕЙ ===== */
  useEffect(() => {
    fetch(`${API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data.items || []))
      .catch(() => toast.error("Ошибка загрузки пользователей"));
  }, []);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===== СОЗДАНИЕ ОДНОГО ОБЪЯВЛЕНИЯ ===== */
  const submitOne = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (selectedUser) {
      formData.append("userId", selectedUser);
    }

    const res = await fetch("http://localhost:5001/api/admin/listings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (res.ok) {
      toast.success("✅ Авто добавлено");
      setForm({ brand: "", model: "", price: "", mileage: "" });
      setImageFile(null);
      setSelectedUser("");
    } else {
      toast.error("Ошибка добавления");
    }
  };

  /* ===== МАССОВАЯ ЗАГРУЗКА ===== */
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const data = JSON.parse(text);

    const res = await fetch("http://localhost:5001/api/admin/listings/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ listings: data })
    });

    res.ok
      ? toast.success("📦 Массово загружено")
      : toast.error("Ошибка загрузки");
  };

  return (
    <div className="admin-create">
      <h1 className="admin-title">➕ Создание объявления</h1>

      {/* ===== ОДИНОЧНОЕ ===== */}
      <div className="admin-card">
        <h2>🚗 Добавить авто</h2>

        <form className="admin-form" onSubmit={submitOne}>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">👑 От имени администратора</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>

          <div className="grid">
            <input name="brand" placeholder="Марка" value={form.brand} onChange={change} required />
            <input name="model" placeholder="Модель" value={form.model} onChange={change} required />
            <input name="price" placeholder="Цена (€)" value={form.price} onChange={change} required />
            <input name="mileage" placeholder="Пробег (км)" value={form.mileage} onChange={change} />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <Button variant="success" type="submit">
            Сохранить
          </Button>
        </form>
      </div>

      {/* ===== МАССОВАЯ ===== */}
      <div className="admin-card">
        <h2>📦 Массовая загрузка (JSON)</h2>

        <div className="upload-box">
          <input type="file" accept=".json" onChange={handleFileUpload} />
          <p>Загрузите JSON-файл со списком авто</p>
        </div>
      </div>
    </div>
  );
}
