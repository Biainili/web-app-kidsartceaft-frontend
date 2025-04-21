import "../index.css";
import iconInstagram from "../assets/icons/instagram.png"
import iconTelegram from "../assets/icons/telegram.png"

const Footer = () => {
  return (
    <footer >
      <h2>Connect with Us!</h2>
      <p>Follow our creations and stay inspired:</p>
      <div className="social-links">
        <a href="https://www.instagram.com/kidsartcraft.am/" target="_blank">
          <img src={iconInstagram} alt="" />
        </a>
        <a href="https://t.me/kidsartcraft_bot" target="_blank">
        <img src={iconTelegram} alt="" /> 
        </a>
      </div>
      <p className="final-call">
        Make memories tangible. Transform your pictures into delightful plush
        toys today with KidsArtCraft!
      </p>
    </footer>
  );
};

export default Footer;
