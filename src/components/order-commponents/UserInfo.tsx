import { useNavigate } from "react-router-dom";
import "../../styles/order.css";


interface UserInfoProps {
    username: string;
    email: string;
    phone: string;
    location: string;
    onContinue: () => void;
}


export const UserInfo: React.FC<UserInfoProps> = ({ username, email, phone, location, onContinue }) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="user-info">
                <h2>Your Information</h2>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Location:</strong> {location}</p>
                <hr />
                <p><strong>Information:</strong>  {`Please confirm your profile details, fill out the form (city, address, etc.), and upload your drawing. Then confirm and pay for your order. Your order will be completed and delivered within ${location === "Armenia" ? "4–7 days." : "7-14 days."} `}</p>
                
                <div className="buttons-container">
                    <button onClick={() => navigate("/profile")}>Edit Profile</button>
                    <button onClick={onContinue}>Continue to Order</button>
                </div>
            </div>
        </div>
    )
}