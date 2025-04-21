import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export const LoginPage: React.FC = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    // Если пользователь уже авторизован, перенаправляем его в профиль
    if (isAuthenticated) {
        navigate("/profile");
    }

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
            </form>
        </div>
    );
};
