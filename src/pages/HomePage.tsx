import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import HeroImg from "../assets/img/Hero-KidsArtCraft.png";
import KidsVideo from "../assets/video/KidsArtCraft-video.mp4";
import photo1 from "../assets/img/kidsartcraft-photo_1.png";
import photo2 from "../assets/img/kidsartcraft-photo_2.png";
import photo3 from "../assets/img/kidsartcraft-photo_3.png";
import "../index.css";

const HomePage: React.FC = () => {
  const { user, fetchUserData } = useUser();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="landing-container">
      <div className="hero">
        <img src={HeroImg} alt="KidsArtCraft" className="hero-img" />
        <h1>Welcome to KidsArtCraft</h1>
        <p>Turn Your Pictures into Lovable Toys!</p>
      </div>

      <section className="description">
        <p>
          Bring your favorite pictures to life with custom-made toys by
          KidsArtCraft. We specialize in creating unique, personalized plush
          toys designed exactly from your treasured drawings or photographs.
        </p>
        <div className="order-buttons">
          <Link to={user ? "/order" : "/login"} className="btn">
            Order Now
          </Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works:</h2>
        <ol>
          <li>
            <strong>Upload Your Image:</strong> Easily submit your favorite
            photo or drawing through our intuitive web application.
          </li>
          <li>
            <strong>Choose Your Size:</strong> Select from our available sizes –
            <strong> S (30 cm), M (40 cm), or L (50 cm).</strong>
          </li>
          <li>
            <strong>We Create & Deliver:</strong> Sit back and relax! Our
            skilled artisans handcraft your toy using eco-friendly materials.
          </li>
        </ol>
      </section>

      <section className="examples">
        <h2>Our Creations</h2>
        <div className="gallery">
          <img src={photo1} alt="Toy Example 1" />
          <img src={photo2} alt="Toy Example 2" />
          <img src={photo3} alt="Toy Example 3" />
        </div>
        <h2>Our Vibe</h2>
        <div className="video-demo">
          <video controls>
            <source src={KidsVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="eco-friendly">
        <h2>Eco-Friendly & Safe</h2>
        <p>
          At KidsArtCraft, we care deeply about the environment and your loved
          ones. Each toy is carefully crafted from high-quality, eco-friendly
          materials ensuring a safe, cuddly companion for children and adults
          alike.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
