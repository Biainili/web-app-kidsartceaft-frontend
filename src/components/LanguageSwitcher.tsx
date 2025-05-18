import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";   // ★
import i18n from "../i18n";
import "flag-icon-css/css/flag-icons.min.css";
import "../index.css";

export const LanguageSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);

  // —–– router helpers
  const navigate  = useNavigate();
  const { pathname } = useLocation();   // текущий путь, напр.  /ru/profile

  const toggleMenu = () => setOpen(!open);

  /** меняем язык + корректируем URL */
  const changeLanguage = (lng: string) => {
    // 1) переключаем переводы
    i18n.changeLanguage(lng);

    // 2) подменяем первый сегмент /en|ru|hy → /{lng}
    const newPath = pathname.replace(/^\/(en|ru|hy)/, `/${lng}`);

    // 3) если пользователь был на «корне» /   (редирект ещё не сработал)
    //    либо regex не сработал — добавим префикс вручную
    const finalPath = newPath.startsWith(`/${lng}`) ? newPath : `/${lng}${pathname}`;

    // 4) навигируем без перезагрузки
    navigate(finalPath, { replace: true });

    setOpen(false);
  };

  // —–– визуальная часть
  const currentLang = i18n.language || "en";
  const flagMap: Record<string, string> = { en: "gb", ru: "ru", hy: "am" };
  const currentFlag = flagMap[currentLang] || "gb";

  return (
    <div className="language_container">
      {/* текущий язык */}
      <button onClick={toggleMenu} className="btn-Lng">
        <i className={`flag-icon flag-icon-${currentFlag}`}></i>
      </button>

      {/* выпадающий список */}
      {open && (
        <div className="toggle_btn">
          {(["en", "ru", "hy"] as const).map((lng) => (
            <button key={lng} onClick={() => changeLanguage(lng)}>
              <i className={`flag-icon flag-icon-${flagMap[lng]}`}></i>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
