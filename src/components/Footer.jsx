import "../index.css";
import iconInstagram from "../assets/icons/instagram.png";
import iconTelegram from "../assets/icons/telegram.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <h2>{t("footer.title")}</h2>
      <p>{t("footer.subtitle")}:</p>
      <div className="social_container">
        <div className="social-links">
          <a href="https://www.instagram.com/kidsartcraft.am/" target="_blank">
            <img src={iconInstagram} alt="" />
          </a>
          <a href="https://t.me/kidsartcraft_bot" target="_blank">
            <img src={iconTelegram} alt="" />
          </a>
        </div>
        <div className="email">
          <p>support@kidsartcraft.ai</p>
        </div>
      </div>
      <p className="final-call">{t("footer.callout")}</p>
    </footer>
  );
};

export default Footer;
