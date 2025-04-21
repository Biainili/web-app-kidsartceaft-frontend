import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

// Интерфейс пользователя
interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  location: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  fetchUserData: () => Promise<void>;
}

// Создаём контекст пользователя
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Провайдер контекста
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token"); // Получаем токен из localStorage

      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Добавляем "Bearer"
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data: User = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
