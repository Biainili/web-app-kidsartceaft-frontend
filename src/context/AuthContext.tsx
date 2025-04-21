import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext"; // ✅ Импортируем `UserContext`

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, navigate: (path: string) => void) => void;
    logout: (navigate: (path: string) => void) => void;
}

// Создаём контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер аутентификации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { fetchUserData, setUser } = useUser(); // ✅ Берём `fetchUserData()`

    // Проверяем, есть ли токен при загрузке
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    // ✅ Функция логина (обновляем `UserContext`)
    const login = async (token: string, navigate: (path: string) => void) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        await fetchUserData(); // ✅ Принудительно загружаем нового пользователя
        navigate("/profile");
    };

    // ✅ Функция выхода (удаляем пользователя из `UserContext`)
    const logout = async (navigate: (path: string) => void) => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        await fetchUserData();
        setUser(null); // ✅ Очищаем пользователя
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для удобства
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
