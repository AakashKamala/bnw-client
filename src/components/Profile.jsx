import React, { useEffect } from 'react';
import { useAuth } from "./verify/Auth"
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Order from './Order';

const Profile = () => {
  const { user, isLoggedIn, fetchUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!isLoggedIn) {
    navigate("/login");
  }

  const { LogoutUser } = useAuth();

  const handleLogout = async () => {
    await LogoutUser();
    navigate("/login")
    window.location.reload();
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <Order user={user} />
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  )
}

export default Profile;