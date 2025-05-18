import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext"; 
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import "./App.css";
import { OrderPage } from "./pages/OrderPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <ModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="order" element={<OrderPage />} />
              </Route>
            </Routes>
          </Router>
        </ModalProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;
