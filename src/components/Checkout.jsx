import React, { useContext } from 'react';
import { OrderContext } from './ProductDetails';
import "./Checkout.css";

function Checkout() {
  const { totalPrice } = useContext(OrderContext);

  const handlePayment = async () => {
    if (totalPrice === null) {
      console.error("Error: Total price is not available");
      return;
    }
  };

  return (
    <div className="checkout-container">
      <h2>Payment Page</h2>
      {totalPrice !== null ? (
        <p>Total Amount: ${totalPrice.toFixed(2)}</p>
      ) : (
        <p>Error: Total price is not available</p>
      )}
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
}

export default Checkout;