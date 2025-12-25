import { makeAutoObservable } from "mobx";

export default class UserStore {
  isAuth = false;
  user = null; // { id, email, role, avatar }

  constructor() {
    makeAutoObservable(this);
  }

  login(userData) {
    this.isAuth = true;
    this.user = userData;
  }

  setAvatar(avatar) {
    if (this.user) {
      this.user.avatar = avatar;
    }
  }

  logout() {
    this.isAuth = false;
    this.user = null;
    localStorage.removeItem("token");
  }

  // 🔥 computed (очень важно)
  get role() {
    return this.user?.role || "user";
  }
}
