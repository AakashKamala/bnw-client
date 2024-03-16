import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './verify/Auth';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const {isLoggedIn}=useAuth();

  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/" className="brand-logo">
          blcknwht
        </NavLink>
        <div className="nav-toggle" onClick={toggleNav}>
          <span className="toggle-icon">{isNavOpen ? '×' : '☰'}</span>
        </div>
        <ul className={`nav-menu ${isNavOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          {isLoggedIn?(<li>
                            <NavLink to="/logout">Logout</NavLink>
                        </li>):(<>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </>)}
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;