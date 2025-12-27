import { useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button.jsx";
import Modal from "../../components/ui/Modal/Modal.jsx";
import "./AdminListingsPage.scss";
import { API_URL } from "../../config/api.js";

export default function AdminListingsPage() {
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  // 👇 единая модалка
  const [modal, setModal] = useState(null);

  const token = localStorage.getItem("token");

  const load = async () => {
    const params = new URLSearchParams();
    if (statusFilter) params.append("status", statusFilter);
    if (search) params.append("search", search);

    const res = await fetch(
      `${API_URL}/api/admin/listings?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();
    setItems(Array.isArray(data.items) ? data.items : []);
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ подтверждение смены статуса
  const confirmStatus = async () => {
    if (!modal) return;

    await fetch(
      `${API_URL}/api/admin/listings/${modal.id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: modal.type })
      }
    );

    setModal(null);
    load();
  };

  // ✅ удаление
  const confirmDelete = async () => {
    if (!modal) return;

    await fetch(
      `${API_URL}/api/admin/listings/${modal.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setModal(null);
    load();
  };

  return (
    <div className="admin-listings">
      <h1>Объявления</h1>

      {/* ФИЛЬТРЫ */}
      <div className="admin-listings__filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Все статусы</option>
          <option value="pending">На модерации</option>
          <option value="approved">Одобренные</option>
          <option value="rejected">Отклонённые</option>
        </select>

        <input
          placeholder="Поиск по марке / модели"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button onClick={load}>Применить</Button>
      </div>

      {/* ТАБЛИЦА */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Фото</th>
            <th>Марка / Модель</th>
            <th>Цена</th>
            <th>Статус</th>
            <th>Пользователь</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {items.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>

              <td>
                {l.image && (
                  <img
                    src={l.image}
                    alt=""
                    style={{ width: 80, height: 50, objectFit: "cover" }}
                  />
                )}
              </td>

              <td>{l.brand} {l.model}</td>
              <td>{l.price} €</td>
              <td>{l.status}</td>
              <td>{l.User?.email}</td>

              <td className="admin-table__actions">
                <Button
                  success
                  disabled={l.status === "approved"}
                  onClick={() => setModal({ type: "approved", id: l.id })}
                >
                  Одобрить
                </Button>

                <Button
                  danger
                  disabled={l.status === "rejected"}
                  onClick={() => setModal({ type: "rejected", id: l.id })}
                >
                  Отклонить
                </Button>

                <Button
                  variant="danger"
                  onClick={() => setModal({ type: "delete", id: l.id })}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= MODAL ================= */}
      <Modal
        open={!!modal}
        title={
          modal?.type === "delete"
            ? "Удалить объявление?"
            : modal?.type === "approved"
            ? "Одобрить объявление?"
            : "Отклонить объявление?"
        }
        onClose={() => setModal(null)}
      >
        {modal?.type === "delete" && (
          <>
            <p>Это действие нельзя отменить.</p>
            <Button danger onClick={confirmDelete}>
              Да, удалить
            </Button>
          </>
        )}

        {modal?.type === "approved" && (
          <>
            <p>Объявление станет доступно всем пользователям.</p>
            <Button onClick={confirmStatus}>Подтвердить</Button>
          </>
        )}

        {modal?.type === "rejected" && (
          <>
            <p>Объявление будет отклонено и скрыто.</p>
            <Button danger onClick={confirmStatus}>
              Отклонить
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
}
