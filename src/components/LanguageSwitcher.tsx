import { useState } from "react";
import i18n from "../i18n";
import "flag-icon-css/css/flag-icons.min.css";
import "../index.css";

export const LanguageSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(!open);
  };

  const currentLang = i18n.language || "en";

  const flagMap: Record<string, string> = {
    en: "gb",
    ru: "ru",
    hy: "am",
  };

  const currentFlag = flagMap[currentLang] || "gb";

  return (
    <div className="language_container">
      <button onClick={toggleMenu} className="btn-Lng">
        <i className={`flag-icon flag-icon-${currentFlag}`}></i>
      </button>

      {open && (
        <div className="toggle_btn">
          <button onClick={() => changeLanguage("en")}>
            <i className="flag-icon flag-icon-gb"></i>
          </button>
          <button onClick={() => changeLanguage("ru")}>
            <i className="flag-icon flag-icon-ru"></i>
          </button>
          <button onClick={() => changeLanguage("hy")}>
            <i className="flag-icon flag-icon-am"></i>
          </button>
        </div>
      )}
    </div>
  );
};
