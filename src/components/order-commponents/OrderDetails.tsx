import "../../styles/order.css";
import fileUpload from "../../assets/img/file-upload.webp";
import { useUser } from "../../context/UserContext";
import { useEffect, useCallback, useState } from "react";

interface OrderDetailsProps {
  formData: {
    city: string;
    address: string;
    comment: string;
    size: string;
    price: number;
    promoCode: string;
    orderImg: File | null;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<OrderDetailsProps["formData"]>
  >;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  formData,
  setFormData,
  onChange,
  onNext,
  onBack,
}) => {
  const { user } = useUser();
  const [errors, setErrors] = useState<{ city?: string; address?: string }>({});

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

  const calculatePrice = () => {
    let basePrice = 0;

    if (user?.location === "Armenia") {
      switch (formData.size) {
        case "S":
          basePrice = 12800;
          break;
        case "M":
          basePrice = 15800;
          break;
        case "L":
          basePrice = 18800;
          break;
        default:
          basePrice = 15800;
      }
    } else if (user?.location === "Russia") {
      switch (formData.size) {
        case "S":
          basePrice = 6000;
          break;
        case "M":
          basePrice = 8000;
          break;
        case "L":
          basePrice = 10000;
          break;
        default:
          basePrice = 8000;
      }
    }

    setFormData((prev) => ({
      ...prev,
      price: basePrice,
    }));
  };

  useEffect(() => {
    calculatePrice();
  }, [user?.location, formData.size]);

  const handleNext = () => {
    const newErrors: { city?: string; address?: string } = {};

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="order-details">
      {/* <span>{formData.price}</span> */}

      <div className="order-row-conatiner-custom">
        <label>
          City: *
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            required
            className={formData.city ? "disabled-input" : ""}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </label>
        <label>
          Address: *
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            className={formData.address ? "disabled-input" : ""}
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </label>
      </div>
      <span className="size-selection-taitel">Select Size: *</span>
      <div className="size-selection">
        <label
          className={`product_radio ${
            formData.size === "S" ? "active_radio" : ""
          }`}
        >
          <span>Small</span>
          <input
            type="radio"
            name="size"
            value="S"
            checked={formData.size === "S"}
            onChange={onChange}
          />
          <span>30 см.</span>
          {user?.location === "Armenia" ? "12 800 AMD" : "6 000 RUB"}
        </label>
        <label
          className={`product_radio ${
            formData.size === "M" ? "active_radio" : ""
          }`}
        >
          <span>Medium</span>
          <input
            type="radio"
            name="size"
            value="M"
            checked={formData.size === "M"}
            onChange={onChange}
          />
          <span>40 см.</span>
          <span>{user?.location === "Armenia" ? "15 800 AMD" : "8 000 RUB"}</span>
        </label>
        <label
          className={`product_radio ${
            formData.size === "L" ? "active_radio" : ""
          }`}
        >
          <span>Large</span>
          <input
            type="radio"
            name="size"
            value="L"
            checked={formData.size === "L"}
            onChange={onChange}
          />
          <span className={""}>50 см.</span>
          <span>{user?.location === "Armenia" ? "18 800 AMD" : "10 000 RUB"}</span>
        </label>
      </div>
      <div className="order-row-conatiner-custom">
        <label>
          Promo Code:
          <input
            type="text"
            name="promoCode"
            value={formData.promoCode}
            onChange={onChange}
            placeholder="Enter promo code (optional)"
            className={formData.promoCode ? "disabled-input" : ""}
          />
        </label>
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={onChange}
            placeholder="If you have any comments"
            className={formData.comment ? "disabled-input" : ""}
          />
        </label>
      </div>

      <div className="upload-container">
        <span>Add Phto for toy: *</span>
        <label className="upload-label">
          <input
            type="file"
            name="orderImg"
            accept="image/*"
            onChange={handleChange}
          />
          <div
            className="upload-preview"
            style={{
              backgroundImage: `url(${
                formData.orderImg
                  ? URL.createObjectURL(formData.orderImg)
                  : fileUpload
              })`,
            }}
          >
            {!formData.orderImg && "+"}
          </div>
        </label>
      </div>

      <div className="buttons-container">
        <button onClick={onBack}>Back</button>
        <button onClick={handleNext}>Continue</button>
      </div>
    </div>
  );
};
