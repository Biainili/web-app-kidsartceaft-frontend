import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import "../styles/login.css";
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [recoverEmail, setRecoverEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { t } = useTranslation();

  // Если пользователь уже авторизован, перенаправляем его в профиль

  const { user } = useUser();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Authorization error");
      }

      const data = await response.json();
      login(data.token, navigate); // Передаём `navigate`
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error. Check your email and password.");
    }
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/recover-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: recoverEmail }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send recovery email");
      }

      setShowForgot(false);
    } catch (error) {
      alert("Error while recovering password");
      console.error(error);
    }
  };

  return (
    <div className="login_main">
      <h2>{t("login")}</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("loginPage.emailPlaceholder")}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("loginPage.passwordPlaceholder")}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          >
            {showPassword ? "👁" : "🙈"}
          </span>
        </div>

        <button type="submit">{t("login")}</button>
        <div className="container_forgot_register">
          <Link to={"/register"}>{t("loginPage.recover.newAccount")}</Link>
          <button id="forgot_pass" onClick={() => setShowForgot(true)}>
            {t("forgotPassword")}
          </button>
        </div>
        {showForgot && (
          <div className="forgot_container">
            <button id="close_forgot" onClick={() => setShowForgot(false)}>
              x
            </button>
            <div className="for_email">
              <input
                type="email"
                name="recoverEmail"
                value={recoverEmail}
                onChange={(e) => setRecoverEmail(e.target.value)}
                placeholder={t("loginPage.recover.emailPlaceholder")}
                required
              />
              <button type="button" onClick={handleRecoverPassword}>
                {t("loginPage.recover.button")}
              </button>
              <p>{t("loginPage.recover.info")}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
