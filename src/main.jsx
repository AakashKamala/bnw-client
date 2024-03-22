import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './components/verify/Auth';
import { OrderContext } from './components/ProductDetails.jsx';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { inject } from '@vercel/analytics';
inject();

const Main = () => {
  const [orderData, setOrderData] = useState(() => {
    const storedOrderData = localStorage.getItem('orderData');
    return storedOrderData
      ? JSON.parse(storedOrderData)
      : {
          total: 0,
          quantity: 0,
          selectedSize: '',
          productId: null,
          userId: null,
          totalPrice: 0
        };
  });

  useEffect(() => {
    localStorage.setItem('orderData', JSON.stringify(orderData));
  }, [orderData]);

  return (
    <AuthProvider>
      <OrderContext.Provider value={{ ...orderData, setOrderData }}>
        <React.StrictMode>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            bodyClassName="toastBody"
            // transition: Bounce
          />
        </React.StrictMode>
      </OrderContext.Provider>
    </AuthProvider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Main />);