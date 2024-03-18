import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { OrderContext } from './ProductDetails';
import { baseURL } from '../../url';

function Checkout() {
  const navigate = useNavigate();
  const { userId, productId, selectedSize, quantity, totalPrice } = useContext(OrderContext);

  const handlePayment = async () => {
    if (totalPrice === null) {
      console.error("Error: Total price is not available");
      return;
    }

    const orderData = {
      userId,
      productId,
      size: selectedSize,
      quantity,
      totalPrice
    };

    try {
      console.log(orderData)
      const response = await axios.post(`${baseURL}/api/orders`, orderData);
      console.log(response)

      if (response.status === 201) {
        navigate("/orders");
      } else {
        console.error("Error: Failed to save order data", response.data);
      }
    } catch (error) {
      console.error("Error while processing payment:", error.response?.data || error.message);
    }
  };

  return (
    <div>
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