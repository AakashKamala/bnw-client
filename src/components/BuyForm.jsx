import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./verify/Auth";
import { useNavigate } from "react-router-dom";
import "./BuyForm.css";
import { baseURL } from "../../url";
import { OrderContext } from './ProductDetails';

const BuyForm = () => {
  const { user, fetchUserData, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { userId, productId, selectedSize, quantity, totalPrice} = useContext(OrderContext);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchUserData();

    if (!isAuthenticated) {
      navigate("/customer-login");
    }
  }, [isAuthenticated, fetchUserData, navigate]);

  const { name, address } = user || {};
  const { house, locality, city, state, country, pincode } = address || {};
  const formData = { userId, productId, name, address, size: selectedSize, quantity, totalPrice };

  const handleEdit = () => {
    navigate("/edit-customer-details");
  };

  const handlePay = async () => {
    try {
      const response = await fetch(`${baseURL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      const responseData = await response.json();
      console.log(responseData);
      navigate("/checkout");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div>
      {user && (
        <div className="details-container">
          <div className="address-container">
            <div className="name-container">name: {name}</div>
            <div>house: {house}</div>
            <div>locality: {locality}</div>
            <div>city: {city}</div>
            <div>state: {state}</div>
            <div>country: {country}</div>
            <div>pincode: {pincode}</div>
          </div>
        </div>
      )}
      <div>
        <div className="buy-form-container">
          <button onClick={handlePay}>confirm details and pay</button>
          <button onClick={handleEdit}>Edit details</button>
        </div>
      </div>
    </div>
  );
};

export default BuyForm;