import React, { useState, useEffect } from 'react';
import { baseURL } from '../../url';
import { useAuth } from './verify/Auth';

const Order = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(`${baseURL}/api/orders/${user._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
    }
  }, [user]);

  return (
    <div>
      <h2>All Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Size: {order.size}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: {order.totalPrice}</p>
            <p>Name: {order.name}</p>
            <p>Address: {order.address.house}, {order.address.locality}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.pincode}</p>
            <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;