import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../../index";
import NotificationDropdown from "../../ui/NotificationDopdown/NotificationDropdown";
import "./Header.scss";
import HeaderSearch from "../../HeaderSearch/HeaderSearch";

const Header = observer(() => {
  const [open, setOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [closing, setClosing] = useState(false);

  const { user, notification } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsSmall(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".notif-box") &&
        !e.target.closest(".header__notify")
      ) {
        setNotifyOpen(false);
        setClosing(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  useEffect(() => {
    if (user.isAuth) notification.load();
  }, [user.isAuth]);

  const logout = () => {
    user.logout();
    navigate("/");
  };
  const toggleNotify = () => {
    if (notifyOpen) {
      setClosing(true);
      setTimeout(() => {
        setNotifyOpen(false);
        setClosing(false);
      }, 180);
    } else {
      setNotifyOpen(true);
    }
  };


  return (
    <header className={`header ${isSmall ? "small" : ""}`}>
      <div className="header__container">

       
        <Link to="/" className="header__logo">
  <span className="logo-mark">●</span>
  <span className="logo-car">Car</span>
  <span className="logo-portal">Portal</span>
</Link>


        
        <nav className={`header__nav ${open ? "active" : ""}`}>
          <Link to="/">Главная</Link>
          <Link to="/listings">Объявления</Link>
          <Link to="/brands">Бренды</Link>
          {user.isAuth && <Link to="/create">Создать</Link>}
        </nav>


        {/* ACTIONS */}
        <div className="header__actions">

       <HeaderSearch/>
       {user.isAuth && user.role === "admin" && (
    <button
      className="admin-btn"
      onClick={() => navigate("/admin")}
      title="Админ панель"
    >
      🛠
    </button>
  )}

          {/* NOTIFY */}
          {user.isAuth && (
          <div className="header__notify">
          <button onClick={() => setNotifyOpen(!notifyOpen)}>
            🔔
            {notification.unread > 0 && (
              <span className="notify__badge">{notification.unread}</span>
            )}
          </button>
        
          {notifyOpen && <NotificationDropdown />}
        </div>
          )}

          {/* PROFILE */}
          {user.isAuth ? (
            <div className="header__avatar">
         <img
  src={
    user.user?.avatar
      ? `http://localhost:5001${user.user.avatar}`
      : "/avatar-placeholder.png"
  }
  alt="avatar"
  onClick={() => setProfileOpen(prev => !prev)}
/>
              {profileOpen && (
                <div className="profile-menu">
                  <Link to="/profile">Профиль</Link>
                  <Link to="/favorites">Избранное</Link>
                  <button onClick={logout}>Выйти</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="login-btn">
              Войти
            </Link>
          )}
        </div>
      

        {/* BURGER */}
        <div className="header__burger" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>

      </div>
    </header>
  );
});

export default Header;
