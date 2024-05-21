import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
  selectUser,
  selectAuthStatus,
  selectAuthToken,
} from "./features/auth/authSlice";

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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import ErrorBoundaryElement from "./components/Error/ErrorBoundaryElement";

import "./App.css";

const App = () => {
  const currentUser = useSelector(selectUser);
  const currentAuthStatus = useSelector(selectAuthStatus);
  const currentAuthToken = useSelector(selectAuthToken);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (currentUser && currentAuthToken) {
      if (!location.pathname.includes("home")) {
        navigate("/home/");
      }
    }
  }, [currentUser, navigate, location.pathname, currentAuthToken]);

  if (currentAuthStatus === "loading") {
    return (
      <div className='h-screen relative bg-cyan-100'>
        <span className='loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='home' element={<UserLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <UserHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='inventory'
            element={
              <ProtectedRoute>
                <InventoryPage />
              </ProtectedRoute>
            }
          />
          `
          <Route
            path='transactions'
            element={
              <ProtectedRoute>
                <TransactionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='history'
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile'
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
      <Route path='*' element={<ErrorBoundaryElement />} />
    </Routes>
  );
};

export default App;
