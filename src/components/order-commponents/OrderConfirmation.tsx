import "../../styles/order.css";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";

interface OrderConfirmationProps {
  price: number;
  onConfirm: () => void;
  onBack: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  price,
  onConfirm,
  onBack,
}) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const currencyKey =
    user?.location === "Armenia" ? "currency.amd" : "currency.rub";
  return (
    <div className="order-confirmation">
      <h3>{t("orderConfirmation.title")}</h3>
      <p>
        <strong>{t("orderConfirmation.totalPriceLabel")}:</strong> {price}{" "}
        {t(currencyKey)}.
      </p>
      <p>{t("orderConfirmation.termsText")}</p>
      <div className="buttons-container">
        <button onClick={onBack}>{t("orderConfirmation.backButton")}</button>
        <button onClick={onConfirm}>
          {t("orderConfirmation.confirmButton")}
        </button>
      </div>
    </div>
  );
};
