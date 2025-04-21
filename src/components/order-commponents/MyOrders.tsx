import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

interface Order {
  order_id: string;
  status: string;
  order_date: string;
  delivery_date: string;
}

export const MyOrders: React.FC<{ userId: string | null }> = ({ userId }) => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setError("Вы не авторизованы");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Токен не найден");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Ошибка при получении заказов");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки заказов");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (loading) return <p>⏳ Загрузка заказов...</p>;
  if (error) return <p className="error">❌ {error}</p>;

  return (
    <div className="orders_container">
      <h2>📦 My orders</h2>
      {!orders || orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.order_id} className="order-item">
              <p>
                🆔 <strong>ID заказа:</strong> <span>{order.order_id}</span> 
              </p>
              <p>
                📅 <strong>Дата заказа:</strong> {order.order_date}
              </p>
              <p>
                🚚 <strong>Дата доставки:</strong> {order.delivery_date}
              </p>
              <p>
                ✅ <strong>Статус:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
