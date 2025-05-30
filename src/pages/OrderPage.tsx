import { useState } from "react";
import { useUser } from "../context/UserContext";
import { UserInfo } from "../components/order-commponents/UserInfo";
import { OrderDetails } from "../components/order-commponents/OrderDetails";
import { OrderConfirmation } from "../components/order-commponents/OrderConfirmation";
import { useTranslation } from "react-i18next";
import "../styles/order.css";
import { SEO } from "../components/SEO";
import { getUrls } from "../utils/seo";
import { useParams } from "react-router-dom";

export const OrderPage: React.FC = () => {
  const { user, loading } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    comment: "",
    size: "M",
    price: user?.location === "Russia" ? 8000 : 12800,
    promoCode: "",
    orderImg: null as File | null,
    productType: "toy",
  });
  const { t } = useTranslation();
  const urls = getUrls("");
  const { lang = "en" } = useParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? (e.target as HTMLInputElement).files?.[0] || null
          : value,
    }));
  };

  const handleConfirmOrder = async () => {
    const today = new Date();

    const orderDate = today.toISOString().slice(0, 10);

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(today.getDate() + 10);
    const deliveryDate = estimatedDelivery.toISOString().slice(0, 10);

    const orderData = {
      userId: user?.id,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      location: user?.location,
      ...formData,
      orderDate,
      deliveryDate,
    };

    console.log("Order Data:", orderData);

    try {
      const formDataToSend = new FormData();

      // Добавляем все текстовые данные в `form-data`
      for (const key in orderData) {
        if (key !== "orderImg") {
          // исключаем `orderImg`, так как он файл
          formDataToSend.append(key, String((orderData as any)[key]));
        }
      }

      // Добавляем файл в `form-data`
      if (orderData.orderImg instanceof File) {
        formDataToSend.append("orderImg", orderData.orderImg);
      } else {
        console.error(
          "❌ Ошибка: orderImg не является файлом!",
          orderData.orderImg
        );
      }

      // Выводим `formData` перед отправкой
      console.log("📤 Отправляем в бэкенд:", formDataToSend);

      // Отправляем запрос
      const response = await fetch("/api/orders", {
        method: "POST",
        body: formDataToSend, // 👈 отправляем `form-data`
      });
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        console.error(
          "Ошибка: не удалось распарсить ответ сервера как JSON:",
          responseText
        );
        alert("Ошибка сервера. Попробуйте позже.");
        return; // останавливаем выполнение, т.к. ответ не валиден
      }

      if (response.ok) {
        alert(`✅ Заказ подтвержден! ID заказа: ${result.orderID}`);
        console.log("✅ Order Created:", result);
      } else {
        alert(`❌ Ошибка: ${result.message || "Неизвестная ошибка"}`);
        console.error("❌ Server Error:", result);
      }
    } catch (error) {
      alert("❌ Ошибка при отправке заказа");
      console.error("❌ Fetch Error:", error);
    }
  };

  if (loading) return <div>{t("profilePage.loading")}</div>;
  if (!user) return <div>{t("profilePage.userNotFound")}</div>;

  return (
    <>
      <SEO
        title={t("seo:order.title")}
        description={t("seo:order.desc")}
        canonical={urls[lang as "en" | "ru" | "hy"]}
        alternates={[
          { lang: "en", url: urls.en },
          { lang: "ru", url: urls.ru },
          { lang: "hy", url: urls.hy },
        ]}
      />
      <div className="order-page">
        <div className="order-container">
          {step === 1 && (
            <UserInfo
              username={user?.username || ""}
              email={user?.email || ""}
              phone={user?.phone || ""}
              location={user?.location || ""}
              onContinue={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <OrderDetails
              formData={formData}
              setFormData={setFormData}
              onChange={handleChange}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <OrderConfirmation
              price={formData.price}
              onConfirm={handleConfirmOrder}
              onBack={() => setStep(2)}
            />
          )}
        </div>
      </div>
    </>
  );
};
