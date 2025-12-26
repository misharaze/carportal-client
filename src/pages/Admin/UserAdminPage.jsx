import { useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button.jsx";
import Modal from "../../components/ui/Modal/Modal.jsx";
import { API_URL } from "../../config/api.js";
import GlassButton from "../../components/GlassButton/GlassButton.jsx";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const token = localStorage.getItem("token");


const load = async () => {
  try {
    if (!token) {
      console.warn("Нет токена");
      setUsers([]);
      return;
    }

    const res = await fetch(`${API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error("Ошибка загрузки пользователей");
    }

    const data = await res.json();

    console.log("FULL RESPONSE:", data);
 
  //setUsers(Array.isArray(data) ? data : []);//если добавить items переклинить список исчезнет потому что будем получать массив
  setUsers(Array.isArray(data.items) ? data.items : []);
} catch (err) {
    console.error(err);
    setUsers([]);
  }
};

  useEffect(() => {
    load();
  }, []);

  const remove = async () => {
    await fetch(
      `${API_URL}/api/admin/users/${confirm.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setConfirm(null);
    load();
  };

  return (
    <>
      <h1>Пользователи</h1>
      <table className="admin-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Email</th>
      <th>Роль</th>
      <th>Статус</th>
      <th />
    </tr>
  </thead>

  <tbody>
    {users.map((u) => (
      <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.email}</td>
        <td>{u.role}</td>
        <td>{u.isBanned ? "Заблокирован" : "Активен"}</td>
        <td>
          <GlassButton danger onClick={() => setConfirm(u)}>
            Удалить
          </GlassButton>
        </td>
      </tr>

    ))}

    {users.length === 0 && (
      <tr>
        <td colSpan={5} style={{ textAlign: "center", opacity: 0.6 }}>
          Пользователи не найдены
        </td>
    
      </tr>
    )}
  </tbody>
</table>



      <Modal
        open={!!confirm}
        title="Подтверждение"
        onClose={() => setConfirm(null)}
      >
        <p>Удалить пользователя {confirm?.email}?</p>
        <Button danger onClick={remove}>Да, удалить</Button>
      </Modal>
    </>
  );
}
