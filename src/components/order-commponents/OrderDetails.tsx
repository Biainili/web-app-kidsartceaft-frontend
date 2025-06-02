import "../../styles/order.css";
import fileUpload from "../../assets/img/file-upload.webp";
import fileUpload1 from "../../assets/img/backpack_img.webp";
import { useUser } from "../../context/UserContext";
import { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface OrderDetailsProps {
  formData: {
    city: string;
    address: string;
    comment: string;
    size: string;
    price: number;
    promoCode: string;
    orderImg: File | null;
    productType: string;
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
  const [errors, setErrors] = useState<{
    city?: string;
    address?: string;
    orderImg?: string;
  }>({});

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
      if (formData.productType === "toy") {
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
      } else {
        switch (formData.size) {
          case "S":
            basePrice = 26000;
            break;
          case "M":
            basePrice = 30000;
            break;
          case "L":
            basePrice = 34000;
            break;
          default:
            basePrice = 30000;
        }
      }
    } else if (user?.location === "Russia") {
      if (formData.productType === "toy") {
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
      } else {
        switch (formData.size) {
          case "S":
            basePrice = 10000;
            break;
          case "M":
            basePrice = 12000;
            break;
          case "L":
            basePrice = 14000;
            break;
          default:
            basePrice = 12000;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      price: basePrice,
    }));
  };

  useEffect(() => {
    calculatePrice();
  }, [user?.location, formData.size, formData.productType]);

  const handleNext = () => {
    const newErrors: { city?: string; address?: string; orderImg?: string } = {};

    if (!formData.city.trim()) {
      newErrors.city = t("orderDetails.errorCityRequired");
    }
    if (!formData.address.trim()) {
      newErrors.address = t("orderDetails.errorAddressRequired");
    }
    if (!formData.orderImg) {
      newErrors.orderImg = t("orderDetails.errorOrderImgRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  };
  const { t } = useTranslation();

  const sPrice = user?.location === "Armenia" ? "12 800 " : "6000";
  const mPrice = user?.location === "Armenia" ? "15 800" : "8000";
  const lPrice = user?.location === "Armenia" ? "18 800" : "10 000";

  const sPriceBackPack = user?.location === "Armenia" ? "26 000 " : "10 000";
  const mPriceBackPack = user?.location === "Armenia" ? "30 000" : "12 000";
  const lPriceBackPack = user?.location === "Armenia" ? "34 000" : "14 000";

  const currencyKey =
    user?.location === "Armenia" ? "currency.amd" : "currency.rub";

  const fileUploadResult =
    formData.productType === "toy" ? fileUpload : fileUpload1;
  return (
    <div className="order-details">
      {/* <span>{formData.price}</span> */}
      {/* ADD Type Product Start  */}
      <span className="size-selection-taitel">
        {t("orderDetails.productTypeLabel")}: *
      </span>
      <div className="product-type-selection">
        <label
          className={`product_radio  ${
            formData.productType === "toy" ? "active_radio" : ""
          }`}
        >
          <span>{t("orderDetails.toyLabel")}</span>
          <input
            type="radio"
            name="productType"
            value="toy"
            checked={formData.productType === "toy"}
            onChange={onChange}
          />
        </label>
        <label
          className={`product_radio ${
            formData.productType === "backpack" ? "active_radio" : ""
          }`}
        >
          <span>{t("orderDetails.backpackLabel")}</span>
          <input
            type="radio"
            name="productType"
            value="backpack"
            checked={formData.productType === "backpack"}
            onChange={onChange}
          />
        </label>
      </div>
      {/* ADD Type Product End  */}

      <div className="order-row-conatiner-custom">
        <label>
          {t("orderDetails.cityLabel")}: *
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            required
            className={formData.city ? "disabled-input" : ""}
            placeholder={t("orderDetails.cityLabelPlaceholder")}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </label>
        <label>
          {t("orderDetails.addressLabel")}: *
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            className={formData.address ? "disabled-input" : ""}
            placeholder={t("orderDetails.addressLabelPlaceholder")}
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </label>
      </div>
      <span className="size-selection-taitel">
        {t("orderDetails.sizeTitle")}: *
      </span>
      <div className="size-selection">
        <label
          className={`product_radio ${
            formData.size === "S" ? "active_radio" : ""
          }`}
        >
          <span>S</span>
          <input
            type="radio"
            name="size"
            value="S"
            checked={formData.size === "S"}
            onChange={onChange}
          />
          <span>30 {t("orderDetails.sm")}</span>
          <span>
            {formData.productType === "toy" ? sPrice : sPriceBackPack}{" "}
            {t(currencyKey)}
          </span>
        </label>
        <label
          className={`product_radio ${
            formData.size === "M" ? "active_radio" : ""
          }`}
        >
          <span>M</span>
          <input
            type="radio"
            name="size"
            value="M"
            checked={formData.size === "M"}
            onChange={onChange}
          />
          <span>40 {t("orderDetails.sm")}</span>
          <span>
            {formData.productType === "toy" ? mPrice : mPriceBackPack}{" "}
            {t(currencyKey)}
          </span>
        </label>
        <label
          className={`product_radio ${
            formData.size === "L" ? "active_radio" : ""
          }`}
        >
          <span>L</span>
          <input
            type="radio"
            name="size"
            value="L"
            checked={formData.size === "L"}
            onChange={onChange}
          />
          <span className={""}>50 {t("orderDetails.sm")}</span>
          <span>
            {formData.productType === "toy" ? lPrice : lPriceBackPack}{" "}
            {t(currencyKey)}
          </span>
        </label>
      </div>
      <div className="order-row-conatiner-custom">
        <label>
          {t("orderDetails.promoCodeLabel")}:
          <input
            type="text"
            name="promoCode"
            value={formData.promoCode}
            onChange={onChange}
            placeholder={t("orderDetails.promoCodePlaceholder")}
            className={formData.promoCode ? "disabled-input" : ""}
          />
        </label>
        <label>
          {t("orderDetails.commentLabel")}:
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={onChange}
            placeholder={t("orderDetails.commentPlaceholder")}
            className={formData.comment ? "disabled-input" : ""}
          />
        </label>
      </div>

      <div className="upload-container">
        <span>{t("orderDetails.addPhoto")}: *</span>
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
                  : fileUploadResult
              })`,
            }}
          >
            {!formData.orderImg && "+"}
          </div>
        </label>
        {errors.orderImg && <span className="error-message">{errors.orderImg}</span>}
      </div>

      <div className="buttons-container">
        <button onClick={onBack}>{t("orderDetails.backButton")}</button>
        <button onClick={handleNext}>{t("orderDetails.continueButton")}</button>
      </div>
    </div>
  );
};
