import "../../styles/order.css";
interface OrderConfirmationProps {
    price: number;
    onConfirm: () => void;
    onBack: () => void;
}


export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ price, onConfirm, onBack }) => {
    return (
        <div className="order-confirmation">
            <h3>Order Summary</h3>
            <p><strong>Total Price:</strong> {price} руб.</p>
            <p>By confirming, you agree to our terms and conditions.</p>
            <div className="buttons-container">
                <button onClick={onBack}>Back</button>
                <button onClick={onConfirm}>Confirm and Pay</button>
            </div>
        </div>
    )
}