import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage       from "./pages/HomePage";
import { LoginPage }  from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage }  from "./pages/ProfilePage";
import { OrderPage }    from "./pages/OrderPage";

import Layout           from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider }  from "./context/UserContext";

import { LangRouter }   from "./router/LangRouter";   // провайдер языка
import "./App.css";

const App: React.FC = () => (
  <UserProvider>
    <AuthProvider>
      <ModalProvider>
        <Router>
          <Routes>
            {/* корень → /en */}
            <Route path="/" element={<Navigate to="/en" replace />} />

            {/* сегмент :lang (любой) — проверяем внутри LangRouter */}
            <Route path=":lang/*" element={<LangRouter />}>
              {/* общий макет */}
              <Route element={<Layout />}>
                <Route index         element={<HomePage />} />
                <Route path="login"   element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="profile"  element={<ProfilePage />} />
                <Route path="order"    element={<OrderPage />} />
              </Route>
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/en" replace />} />
          </Routes>
        </Router>
      </ModalProvider>
    </AuthProvider>
  </UserProvider>
);

export default App;
