// import React, { useState, useEffect } from 'react';
// import { baseURL } from '../../url';
// import { useAuth } from './verify/Auth';

// const Order = () => {

//     const {user}=useAuth();
//     const userId=user._id;
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`${baseURL}/api/orders/${userId}`); // Include userId in the endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await response.json();
//         setOrders(data);
//         console.log(data)
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOrders();
//   }, [userId]); // Include userId in the dependency array to refetch orders when userId changes

//   return (
//     <div>
//       <h2>All Orders</h2>
//       <ul>
//         {orders.map((order) => (
//           <li key={order._id}>
//             {/* <p>User ID: {order.userId}</p>
//             <p>Product ID: {order.productId}</p> */}
//             <p>Size: {order.size}</p>
//             <p>Quantity: {order.quantity}</p>
//             <p>Total Price: {order.totalPrice}</p>
//             <p>Name: {order.name}</p>
//             <p>Address: {order.address.house}, {order.address.locality}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.pincode}</p>
//             <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Order;


// import React, { useState, useEffect } from 'react';
// import { baseURL } from '../../url';

// const Order = ({ user }) => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user) {
//         try {
//           const response = await fetch(`${baseURL}/api/orders/${user._id}`); // Include userId in the endpoint
//           if (!response.ok) {
//             throw new Error('Failed to fetch orders');
//           }
//           const data = await response.json();
//           setOrders(data);
//           console.log(data)
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };

//     fetchOrders();
//   }, [user]); // Re-fetch orders whenever the user prop changes

//   return (
//     <div>
//       <h2>All Orders</h2>
//       <ul>
//         {orders.map((order) => (
//           <li key={order._id}>
//             {/* <p>User ID: {order.userId}</p>
//             <p>Product ID: {order.productId}</p> */}
//             <p>Size: {order.size}</p>
//             <p>Quantity: {order.quantity}</p>
//             <p>Total Price: {order.totalPrice}</p>
//             <p>Name: {order.name}</p>
//             <p>Address: {order.address.house}, {order.address.locality}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.pincode}</p>
//             <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Order;



import React, { useState, useEffect } from 'react';
import { baseURL } from '../../url';
import { useAuth } from './verify/Auth'; // Import useAuth hook to get user authentication status

const Order = () => {
  const { user } = useAuth(); // Get the authenticated user from the useAuth hook
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(`${baseURL}/api/orders/${user._id}`); // Include userId in the endpoint
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
  }, [user]); // Re-fetch orders whenever the user changes

  // Clear orders when user logs out
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
