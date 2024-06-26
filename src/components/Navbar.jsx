import React, { useState } from 'react';
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
          <li onClick={toggleNav}>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          {isLoggedIn?(<li onClick={toggleNav}>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>):(<>
                            <li onClick={toggleNav}>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </>)}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;