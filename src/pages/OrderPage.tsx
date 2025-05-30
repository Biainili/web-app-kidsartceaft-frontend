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

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Заказ подтвержден! ID заказа: ${result.orderID}`);
        console.log("✅ Order Created:", result);
      } else {
        alert(`❌ Ошибка: ${result.message}`);
        console.error("❌ Server Error:", result);
      }
    } catch (error) {
      alert("❌ Ошибка при отправке заказа");
      console.error("❌ Fetch Error:", error);
    }
  };

  // const handleConfirmOrder = async () => {
  //   const today = new Date();

  //   const orderDate = today
  //     .toLocaleDateString("ru-RU", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "2-digit",
  //     })
  //     .replace(/\//g, ".");

  //   const estimatedDelivery = new Date();
  //   estimatedDelivery.setDate(today.getDate() + 10); // +10 days
  //   const deliveryDate = estimatedDelivery
  //     .toLocaleDateString("ru-RU", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "2-digit",
  //     })
  //     .replace(/\//g, ".");

  //   const orderData = {
  //     userId: user?.id,
  //     username: user?.username,
  //     email: user?.email,
  //     phone: user?.phone,
  //     location: user?.location,
  //     ...formData,
  //     orderDate,
  //     deliveryDate,
  //   };

  //   console.log("Order Data:", orderData);

  //   try {
  //     const formDataToSend = new FormData();
  //     for (const key in orderData) {
  //       formDataToSend.append(key, (orderData as any)[key]);
  //     }

  //     if (orderData.orderImg) {
  //       formDataToSend.append("orderImg", orderData.orderImg);
  //     }

  //     // Post - req
  //     const response = await fetch("http://localhost:5000/api/orders", {
  //       method: "POST",
  //       body: formDataToSend,
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       alert(`✅ Заказ подтвержден! ID заказа: ${result.orderID}`);
  //       console.log("✅ Order Created:", result);
  //     } else {
  //       alert(`❌ Ошибка: ${result.message}`);
  //       console.error("❌ Server Error:", result);
  //     }
  //   } catch (error) {
  //     alert("❌ Ошибка при отправке заказа");
  //     console.error("❌ Fetch Error:", error);
  //   }
  // };

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

// import { useEffect, useState } from "react";
// import { useUser } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "../styles/order.css";
// import fileUpload from "../assets/img/file-upload.webp";

// interface OrderFormData {
//   username: string;
//   email: string;
//   phone: string;
//   location: string;
//   city: string;
//   address: string;
//   comment: string;
//   size: string;
//   price: number;
//   promoCode: string;
//   orderImg: File | null;
// }

// export const OrderPage: React.FC = () => {
//   const { user } = useUser();
//   const [formData, setFormData] = useState<OrderFormData>({
//     username: user?.username || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     location: user?.location || "",
//     city: "",
//     address: "",
//     comment: "",
//     size: "M",
//     price: user?.location === "Russia" ? 8000 : 1280,
//     promoCode: "",
//     orderImg: null,
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData((prev) => ({
//         ...prev,
//         username: user.username,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//       }));
//     }
//   }, [user]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "file"
//           ? (e.target as HTMLInputElement).files?.[0] || null
//           : value,
//     }));
//   };

//   const calculatePrice = () => {
//     let basePrice = 0;

//     if (formData.location === "Armenia") {
//       switch (formData.size) {
//         case "S":
//           basePrice = 12800;
//           break;
//         case "M":
//           basePrice = 15800;
//           break;
//         case "L":
//           basePrice = 18800;
//           break;
//         default:
//           basePrice = 15800;
//       }
//     } else if (formData.location === "Russia") {
//       switch (formData.size) {
//         case "S":
//           basePrice = 6000;
//           break;
//         case "M":
//           basePrice = 8000;
//           break;
//         case "L":
//           basePrice = 10000;
//           break;
//         default:
//           basePrice = 8000;
//       }
//     }

//     setFormData((prev) => ({
//       ...prev,
//       price: basePrice,
//     }));
//   };

//   const handleOrderCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     calculatePrice();
//   }, [formData.location, formData.size]);

//   return (
//     <div className="order-page">
//       <div className="order-container">
//         <h2>Create Your Custom Plush Toy</h2>
//         <form onSubmit={handleOrderCreate} className="order-form">
//           <div className="order-row-conatiner-custom">
//             <label>
//               Username:
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 disabled
//               />
//             </label>

//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 disabled
//               />
//             </label>
//           </div>
//           <div className="order-row-conatiner-custom">
//             <label>
//               Phone:
//               <input type="text" name="phone" value={formData.phone} disabled />
//             </label>

//             {/* Адрес доставки */}
//             <label>
//               Location:
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 disabled
//               />
//             </label>
//           </div>
//           <div className="order-row-conatiner-custom">
//             <label>
//               City: *
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//                 className={formData.city ? "disabled-input" : ""}
//               />
//             </label>
//             <label>
//               Address: *
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className={formData.address ? "disabled-input" : ""}
//               />
//             </label>
//           </div>
//           <span className="size-selection-taitel">Select Size: *</span>
//           {/* Выбор размера с ценами */}
//           <div className="size-selection">
//             <label
//               className={`product_radio ${
//                 formData.size === "S" ? "active_radio" : ""
//               }`}
//             >
//               <span>Small</span>
//               <input
//                 type="radio"
//                 name="size"
//                 value="S"
//                 checked={formData.size === "S"}
//                 onChange={handleChange}
//               />
//               <span>30 см.</span>
//               <span>{`${6000} ${"руб."}`}</span>
//             </label>
//             <label
//               className={`product_radio ${
//                 formData.size === "M" ? "active_radio" : ""
//               }`}
//             >
//               <span>Medium</span>
//               <input
//                 type="radio"
//                 name="size"
//                 value="M"
//                 checked={formData.size === "M"}
//                 onChange={handleChange}
//               />
//               <span>40 см.</span>
//               <span>{`${8000} ${"руб."}`}</span>
//             </label>
//             <label
//               className={`product_radio ${
//                 formData.size === "L" ? "active_radio" : ""
//               }`}
//             >
//               <span>Large</span>
//               <input
//                 type="radio"
//                 name="size"
//                 value="L"
//                 checked={formData.size === "L"}
//                 onChange={handleChange}
//               />
//               <span className={""}>50 см.</span>
//               <span>{`${12000} ${"руб."}`}</span>
//             </label>
//           </div>
//           {/* Поле для промокода */}
//           <div className="order-row-conatiner-custom">
//             <label>
//               Promo Code:
//               <input
//                 type="text"
//                 name="promoCode"
//                 value={formData.promoCode}
//                 onChange={handleChange}
//                 placeholder="Enter promo code (optional)"
//                 className={formData.promoCode ? "disabled-input" : ""}
//               />
//             </label>
//             <label>
//               Comment:
//               <input
//                 type="text"
//                 name="comment"
//                 value={formData.comment}
//                 onChange={handleChange}
//                 placeholder="If you have any comments"
//                 className={formData.comment ? "disabled-input" : ""}
//               />
//             </label>
//           </div>

//           {/* Загрузка изображения */}
//           <div className="upload-container">
//             <span>Add Phto for toy: *</span>
//             <label className="upload-label">
//               <input
//                 type="file"
//                 name="orderImg"
//                 accept="image/*"
//                 onChange={handleChange}
//               />
//               <div
//                 className="upload-preview"
//                 style={{
//                   backgroundImage: `url(${
//                     formData.orderImg
//                       ? URL.createObjectURL(formData.orderImg)
//                       : fileUpload
//                   })`,
//                 }}
//               >
//                 {!formData.orderImg && "+"}
//               </div>
//             </label>
//           </div>

//           {/* Кнопка отправки */}
//           <button type="submit" className="order-button">
//             Send Order
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
