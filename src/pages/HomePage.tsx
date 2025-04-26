import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import HeroImg from "../assets/img/Hero-KidsArtCraft.png";
import KidsVideo from "../assets/video/KidsArtCraft-video.mp4";
import photo1 from "../assets/img/kidsartcraft-photo_1.png";
import photo2 from "../assets/img/kidsartcraft-photo_2.png";
import photo3 from "../assets/img/kidsartcraft-photo_3.png";
import "../index.css";

const HomePage: React.FC = () => {
  const { user, fetchUserData } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="landing-container">
      {/* ---------- HERO ---------- */}
      <div className="hero">
        <img src={HeroImg} alt="KidsArtCraft" className="hero-img" />
        <h1>{t("homeWelcome")}</h1>
        <p>{t("homeTagline")}</p>
      </div>

      {/* ---------- DESCRIPTION ---------- */}
      <section className="description">
        <p>{t("homeDescription")}</p>

        <div className="order-buttons">
          <Link to={user ? "/order" : "/login"} className="btn">
            {t("homeOrderNow")}
          </Link>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="how-it-works">
        <h2>{t("howItWorks.title")}</h2>
        <ol>
          <li>
            <strong>{t("howItWorks.stepOneTitle")}</strong>{" "}
            {t("howItWorks.stepOneText")}
          </li>
          <li>
            <strong>{t("howItWorks.stepTwoTitle")}</strong>{" "}
            {t("howItWorks.stepTwoText")}
          </li>
          <li>
            <strong>{t("howItWorks.stepThreeTitle")}</strong>{" "}
            {t("howItWorks.stepThreeText")}
          </li>
        </ol>
      </section>

      {/* ---------- EXAMPLES ---------- */}
      <section className="examples">
        <h2>{t("examples.creationsTitle")}</h2>
        <div className="gallery">
          <img src={photo1} alt="Toy Example 1" />
          <img src={photo2} alt="Toy Example 2" />
          <img src={photo3} alt="Toy Example 3" />
        </div>

        <h2>{t("examples.vibeTitle")}</h2>
        <div className="video-demo">
          <video controls>
            <source src={KidsVideo} type="video/mp4" />
            {t("videoNotSupported", { defaultValue: "Your browser does not support the video tag." })}
          </video>
        </div>
      </section>

      {/* ---------- ECO ---------- */}
      <section className="eco-friendly">
        <h2>{t("ecoTitle")}</h2>
        <p>{t("ecoText")}</p>
      </section>
    </div>
  );
};

export default HomePage;
