import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import ListingsPage from "./pages/ListingPage/ListingPage";
import ListingDetailsPage from "./pages/ListingDetailsPage/ListingDetailsPage";
import BrandsCatalogPage from "./pages/BrandsCatalogPage/BrandsCatalogPage";
import CreateListingPage from "./pages/CreateListingPage/CreateListingPage.jsx";
import AuthPage from "./pages/Auth/AuthPage";
import ProfilePage from "./pages/Profil/Profil";
import EditProfilePage from "./pages/Profil/EditprofilePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";

import AdminLayout from "./pages/Admin/AdminLayout";
import DashboardPage from "./pages/Admin/AdminDashboard";
import AdminListingsPage from "./pages/Admin/AdminListingsPage";
import UsersAdminPage from "./pages/Admin/UserAdminPage";
import StatsPage from "./pages/Admin/StatsPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import CreateListingAdmin from "./pages/Admin/CreateListingAdmin";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoutes/AdminRoutes";

import ForgotPasswordPage from "./pages/Auth/ForgotPassword";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";

import AuthProvider from "./Context/AuthProvider.jsx";
import "./style/Themes.scss";

import "./style/Mains.scss";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import MessagesPage from "./pages/Messages/MessagePage.jsx";
import ChatPage from "./pages/Messages/ChatPage.jsx";

const App = observer(() => {
  return (
    <Router>
      <AuthProvider>
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:id" element={<ListingDetailsPage />} />
            <Route path="/brands" element={<BrandsCatalogPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* 🔐 USER */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
  path="/create"
  element={
    <ProtectedRoute>
      <CreateListingPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/messages"
  element={
    <ProtectedRoute>
      <MessagesPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/messages/:id"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>

            {/* 👑 ADMIN */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="listings" element={<AdminListingsPage />} />
              <Route path="users" element={<UsersAdminPage />} />
              <Route path="stats" element={<StatsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="create" element={<CreateListingAdmin />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </AuthProvider>
    </Router>
  );
});

export default App;
