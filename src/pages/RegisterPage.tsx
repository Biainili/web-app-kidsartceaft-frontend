import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/register.css";
import { useTranslation } from "react-i18next";
import { SEO } from "../components/SEO";
import { getUrls } from "../utils/seo";

// Интерфейс для данных формы
interface RegisterFormData {
  username: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  // Используем интерфейс для типизации состояния
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang = "en" } = useParams();
  const urls = getUrls("");

  // Обработчик изменения полей формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Переключение видимости пароля
  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Обработчик отправки формы
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем совпадение паролей
    if (formData.password !== formData.confirmPassword) {
      alert(t("passwordMismatch"));
      return;
    }

    try {
      const response = await fetch("http://backend:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          password: formData.password,
        }), // Отправляем данные формы
      });

      if (!response.ok) {
        throw new Error("Registration error");
      }

      const data = await response.json();
      console.log(data);
      alert(t("registrationSuccess"));
      navigate(`/${lang}/login`);
    } catch (error) {
      console.error("Registration error:", error);
      alert(t("registrationError"));
    }
  };

  return (
    <>
      <SEO
        title={t("seo:register.title")}
        description={t("seo:register.desc")}
        canonical={urls[lang as "en" | "ru" | "hy"]}
        alternates={[
          { lang: "en", url: urls.en },
          { lang: "ru", url: urls.ru },
          { lang: "hy", url: urls.hy },
        ]}
      />
      <div className="register_main">
        <h2>{t("register")}</h2>
        <form onSubmit={handleRegister} className="register-form">
          <label className="select-location">
            {t("registerPage.usernameLabel")}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("registerPage.usernamePlaceholder")}
              required
            />
          </label>
          <label className="select-location">
            {t("registerPage.emailLabel")}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("registerPage.emailLabel")}
              required
            />
          </label>
          <label className="select-location">
            {t("registerPage.phoneLabel")}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+374XX XX XX XX"
              required
            />
          </label>
          <label className="select-location">
            {t("registerPage.locationLabel")}
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">{t("registerPage.selectCountry")}</option>
              <option value="Armenia">🇦🇲 Armenia</option>
              <option value="Russia">🇷🇺 Russia</option>
            </select>
          </label>

          {/* Поле ввода пароля */}
          <label className="select-location">
            {t("registerPage.passwordLabel")}
            <div className="password-container">
              <input
                type={showPasswords.password ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("registerPage.passwordLabel")}
                required
              />
              <span
                onClick={() => togglePasswordVisibility("password")}
                className="eye-icon"
              >
                {showPasswords.password ? "👁" : "🙈"}
              </span>
            </div>
          </label>

          {/* Поле подтверждения пароля */}
          <label className="select-location">
            {t("registerPage.confirmPasswordLabel")}
            <div className="password-container">
              <input
                type={showPasswords.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t("registerPage.confirmPasswordPlaceholder")}
                required
              />
              <span
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="eye-icon"
              >
                {showPasswords.confirmPassword ? "👁" : "🙈"}
              </span>
            </div>
          </label>

          <button type="submit">{t("register")}</button>
        </form>
      </div>
    </>
  );
};
