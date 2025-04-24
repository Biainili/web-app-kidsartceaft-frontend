import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { useUser } from "../context/UserContext";
import "../index.css";
// import { useEffect, useState } from "react";
import Logo from '../assets/img/kidsartcraft-login.png'


const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const { isLogoutModalOpen, setLogoutModalOpen } = useModal();
    const { user } = useUser();
    // const [currenUser, setCurrenUser] = useState(user);

    const navigate = useNavigate(); // Получаем `navigate`

    const bigLogout = () => {
        setLogoutModalOpen(false);
        logout(navigate);
    }

    // useEffect(() => {
    //     setCurrenUser(user);
    // }, [user])

    return (
        <>
            <header>
                <Link to="/"><img src={Logo} alt="Logo" width={80} className="logo_img" /></Link>
                <nav>
                    {!isAuthenticated && !user ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile">{user ? user.username : 'Profile'}</Link>
                            <button className="logout_btn" onClick={() => setLogoutModalOpen(true)}>Logout</button>
                        </>
                    )}
                </nav>
            </header>

            {isLogoutModalOpen && (
                <div className="overlay" onClick={() => setLogoutModalOpen(false)}></div>
            )}

            {isLogoutModalOpen && <div className="logout_conteiner">
                <span>You are want logout ?</span>
                <div className="bnt_container">
                    <button onClick={bigLogout}>Yes</button>
                    <button onClick={() => setLogoutModalOpen(false)}>No</button>
                </div>
            </div>}

        </>

    );
};

export default Header;
