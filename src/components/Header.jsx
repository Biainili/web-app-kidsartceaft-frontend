import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useUser } from "../context/UserContext";
import "../index.css";
import { LanguageSwitcher } from "./LanguageSwitcher";
// import { useEffect, useState } from "react";
import Logo from "../assets/img/kidsartcraft-login.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { isLogoutModalOpen, setLogoutModalOpen } = useModal();
  const { user } = useUser();
  const { t } = useTranslation();
  // const [currenUser, setCurrenUser] = useState(user);

  const navigate = useNavigate(); // Получаем `navigate`

  const bigLogout = () => {
    setLogoutModalOpen(false);
    logout(navigate);
  };

  // useEffect(() => {
  //     setCurrenUser(user);
  // }, [user])

  return (
    <>
      <header>
        <Link to="/">
          <img src={Logo} alt="Logo" width={80} className="logo_img" />
        </Link>
        <nav>
          {isAuthenticated && user ? (
            <>
              <Link to="/profile">{user ? user.username : "Profile"}</Link>
              <button
                className="logout_btn"
                onClick={() => setLogoutModalOpen(true)}
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login">{t("login")}</Link>
              <Link to="/register">{t("register")}</Link>
            </>
          )}
        </nav>
        <LanguageSwitcher />
      </header>

      {isLogoutModalOpen && (
        <div
          className="overlay"
          onClick={() => setLogoutModalOpen(false)}
        ></div>
      )}

      {isLogoutModalOpen && (
        <div className="logout_conteiner">
          <span>{t("confirm_logout")}</span>
          <div className="bnt_container">
            <button onClick={bigLogout}>{t("yes")}</button>
            <button onClick={() => setLogoutModalOpen(false)}>{t("no")}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
