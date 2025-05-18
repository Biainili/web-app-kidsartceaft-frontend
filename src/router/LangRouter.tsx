import { useParams, Navigate, Outlet } from "react-router-dom";
import i18n from "../i18n";

const SUPPORTED = ["en", "ru", "hy"] as const;

export const LangRouter: React.FC = () => {
  const { lang } = useParams();               // берём :lang из URL

  // 1. Если сегмент не один из SUPPORTED → ведём на дефолт /en
  if (!lang || !SUPPORTED.includes(lang as any)) {
    return <Navigate to="/en" replace />;
  }

  // 2. Если i18next ещё не на том же языке — переключаем
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  // 3. Рендерим вложенные роуты
  return <Outlet />;
};
