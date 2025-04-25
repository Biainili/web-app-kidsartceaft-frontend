import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import "../styles/login.css";

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [recoverEmail, setRecoverEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // Если пользователь уже авторизован, перенаправляем его в профиль

  const {user} = useUser();

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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Переключаем тип поля
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          >
            {showPassword ? "👁" : "🙈"}
          </span>
        </div>

        <button type="submit">Login</button>
        <div className="container_forgot_register">
          <Link to={"/register"}>register a new account </Link>
          <button id="forgot_pass" onClick={() => setShowForgot(true)}>
            forgot password
          </button>
        </div>
        {showForgot && (
          <div className="forgot_container">
            <button id="close_forgot" onClick={() => setShowForgot(false)}>x</button>
            <div className="for_email">
              <input
                type="email"
                name="recoverEmail"
                value={recoverEmail}
                onChange={(e) => setRecoverEmail(e.target.value)}
                placeholder="Please enter email"
                required
              />
              <button type="button" onClick={handleRecoverPassword}>
                Recover password
              </button>
              <p>
                You will receive a 6-digit password to your email to log into
                your account, which you can change in your account profile.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
