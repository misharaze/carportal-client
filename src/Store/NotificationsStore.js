import { makeAutoObservable, runInAction } from "mobx";

export default class NotificationStore {
  notifications = [];
  unread = 0;
  drawerOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  async load() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5001/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      runInAction(() => {
        this.notifications = Array.isArray(data) ? data : [];
        this.unread = this.notifications.filter(n => !n.isRead).length;
      });

    } catch (e) {
      console.error("Ошибка загрузки уведомлений:", e);
    }
  }

  async read(id) {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5001/api/notifications/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });

    this.load();
  }

  async clear() {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5001/api/notifications/clear", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    this.load();
  }

  async markAllAsRead() {
    const unread = this.notifications.filter(n => !n.isRead);

    for (let n of unread) {
      await this.read(n.id);
    }

    this.load();
  }
}
