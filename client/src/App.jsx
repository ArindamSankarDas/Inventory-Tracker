import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserLayout from "./components/Layout/UserLayout";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

import UserHomePage from "./pages/user/UserHomePage";
import InventoryPage from "./pages/inventory/InventoryPage";
import TransactionPage from "./pages/transaction/TransactionPage";
import HistoryPage from "./pages/history/HistoryPage";
import ProfilePage from "./pages/profile/ProfilePage";

import ErrorBoundaryElement from "./components/Error/ErrorBoundaryElement";

import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<UserLayout />}>
          <Route index element={<UserHomePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorBoundaryElement />} />
    </Routes>
  );
};

export default App;
