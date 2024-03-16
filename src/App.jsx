import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import BuyForm from './components/BuyForm';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import Email from './components/verify/Email';
import Mobile from './components/verify/Mobile';
import CustomerDetails from './components/CustomerDetails';
import CustomerEmail from './components/verify/CustomerEmail';
import Logout from './components/Logout';

import { useAuth } from './components/verify/Auth';

function App() {

  const {isLoggedIn}=useAuth();

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/buy" element={<BuyForm />} />
          {!isLoggedIn?(<><Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} /></>):
          <Route path="/logout" element={<Logout />} />}
          <Route path="/email" element={<Email />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/customer-email" element={<CustomerEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;