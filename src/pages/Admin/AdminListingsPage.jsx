
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button.jsx";
import Modal from "../../components/ui/Modal/Modal.jsx";
import "./AdminListingsPage.scss";
import { API_URL } from "../../config/api.js";



export default function AdminListingsPage() {
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  // 🔥 модалка подтверждения
  const [confirmModal, setConfirmModal] = useState(null);

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
    // eslint-disable-next-line
  }, []);

  // ✅ реальный запрос изменения статуса
  const confirmChangeStatus = async () => {
    if (!confirmModal) return;

    await fetch(
      `http://localhost:5001/api/admin/listings/${confirmModal.id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: confirmModal.status })
      }
    );

    setConfirmModal(null);
    load();
  };

  const remove = async (id) => {
    setConfirmModal({ id, delete: true });
  };

  const confirmDelete = async () => {
    await fetch(
      `http://localhost:5001/api/admin/listings/${confirmModal.id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setConfirmModal(null);
    load();
  };

  return (
    <div className="admin-listings">
      <h1>Объявления</h1>

      {/* ФИЛЬТРЫ */}
      <div className="admin-listings__filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Все статусы</option>
          <option value="pending">На модерации</option>
          <option value="approved">Одобренные</option>
          <option value="rejected">Отклонённые</option>
        </select>

        <input
          placeholder="Поиск по марке/модели"
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
                  onClick={() =>
                    setConfirmModal({ id: l.id, status: "approved" })
                  }
                >
                  Одобрить
                </Button>

                <Button
                  danger
                  disabled={l.status === "rejected"}
                  onClick={() =>
                    setConfirmModal({ id: l.id, status: "rejected" })
                  }
                >
                  Отклонить
                </Button>

                <Button variant="danger" onClick={() => remove(l.id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 MODAL */}
      <Modal
        open={!!confirmModal}
        title="Подтверждение"
        onClose={() => setConfirmModal(null)}
      >
        {confirmModal?.delete ? (
          <>
            <p>Удалить объявление?</p>
            <Button danger onClick={confirmDelete}>Да, удалить</Button>
          </>
        ) : (
          <>
            <p>Изменить статус объявления?</p>
            <Button onClick={confirmChangeStatus}>Подтвердить</Button>
          </>
        )}
      </Modal>
    </div>
  );
}
