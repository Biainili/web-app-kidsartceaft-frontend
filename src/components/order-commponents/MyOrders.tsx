import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setError(t("myOrders.notAuthorized")); 
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError(t("myOrders.tokenNotFound"));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("REACT_APP_API_URL/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error receiving orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || t("myOrders.genericError"));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (loading) return <p>⏳ {t("myOrders.loading")}</p>;
  if (error) return <p className="error">❌ {error}</p>;

  return (
    <div className="orders_container">
      <h2>📦 {t("myOrders.title")}</h2>
      {!orders || orders.length === 0 ? (
        <p>{t("myOrders.noOrders")}</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.order_id} className="order-item">
              <p>
                🆔 <strong>{t("myOrders.idLabel")}:</strong> <span>{order.order_id}</span> 
              </p>
              <p>
                📅 <strong>{t("myOrders.orderDateLabel")}:</strong> {order.order_date}
              </p>
              <p>
                🚚 <strong>{t("myOrders.deliveryDateLabel")}:</strong> {order.delivery_date}
              </p>
              <p>
                ✅ <strong>{t("myOrders.statusLabel")}:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
