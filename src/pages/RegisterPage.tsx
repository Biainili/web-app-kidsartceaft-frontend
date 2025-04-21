import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

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
        confirmPassword: ""
    });

    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirmPassword: false
    });

    const navigate = useNavigate();

    // Обработчик изменения полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    password: formData.password
                })// Отправляем данные формы
            })

            if (!response.ok) {
                throw new Error('Registration error');
            }

            const data = await response.json();
            console.log(data)
            alert('Registration successful! Please log in.'); // Сообщаем пользователю
            navigate("/login");

        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration error. Check your data and try again.');
        }


    };

    return (
        <div className="register_main">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="register-form">
                <label className="select-location">
                    User Name
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                </label>
                <label className="select-location">
                    E-Mail
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </label>
                <label className="select-location">
                    Phone Number
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
                    Location:
                    <select name="location" value={formData.location} onChange={handleChange} required>
                        <option value="">Select country</option>
                        <option value="Armenia">🇦🇲 Armenia</option>
                        <option value="Russia">🇷🇺 Russia</option>
                    </select>
                </label>

                {/* Поле ввода пароля */}
                <label className="select-location">
                    Password:
                    <div className="password-container">

                        <input
                            type={showPasswords.password ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <span onClick={() => togglePasswordVisibility("password")} className="eye-icon">
                            {showPasswords.password ? "👁" : "🙈"}
                        </span>
                    </div>
                </label>

                {/* Поле подтверждения пароля */}
                <label className="select-location">
                    Confirm Password:
                    <div className="password-container">
                        <input
                            type={showPasswords.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                        />
                        <span onClick={() => togglePasswordVisibility("confirmPassword")} className="eye-icon">
                            {showPasswords.confirmPassword ? "👁" : "🙈"}
                        </span>
                    </div>
                </label>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};
