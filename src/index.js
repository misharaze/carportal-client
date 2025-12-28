import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { createContext} from "react";
import UserStore from "./Store/UserStore";
import NotificationStore from "./Store/NotificationsStore";
import "./style/Mains.scss"
import "./style/Themes.scss";



export const Context = createContext(null);






const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider value={{ 
    user: new UserStore(),
    notification: new NotificationStore()
   }}>
    <App />
    <Toaster position="top-right" />
  </Context.Provider>
);
