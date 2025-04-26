import { useNavigate } from "react-router-dom";
import "../../styles/order.css";
import { useTranslation } from "react-i18next";

interface UserInfoProps {
  username: string;
  email: string;
  phone: string;
  location: string;
  onContinue: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  username,
  email,
  phone,
  location,
  onContinue,
}) => {
  const navigate = useNavigate();
  const days = location === "Armenia" ? "4–7 " : "7–14 ";
  const { t } = useTranslation();

  return (
    <div>
      <div className="user-info">
        <h2>{t("userInfo.title")}</h2>
        <p>
          <strong>{t("userInfo.usernameLabel")}:</strong> {username}
        </p>
        <p>
          <strong>{t("userInfo.emailLabel")}:</strong> {email}
        </p>
        <p>
          <strong>{t("userInfo.phoneLabel")}:</strong> {phone}
        </p>
        <p>
          <strong>{t("userInfo.locationLabel")}:</strong> {location}
        </p>
        <hr />
        <p>
          <strong>{t("userInfo.infoLabel")}: </strong>
          {t("userInfo.infoText", { days })}
        </p>
        <div className="buttons-container">
          <button onClick={() => navigate("/profile")}>
            {t("userInfo.editProfileButton")}
          </button>
          <button onClick={onContinue}>{t("userInfo.continueButton")}</button>
        </div>
      </div>
    </div>
  );
};
