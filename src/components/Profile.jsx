// import React from 'react';
// import { useAuth } from "./verify/Auth"
// import { useNavigate } from "react-router-dom";
// import Logout from "./Logout";
// import "./Profile.css"; // Import CSS file
// import Order from './Order';

// const Profile = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
//     const { isLoggedIn } = useAuth();

//     // If the user is already logged in, redirect to home page
//     if (isLoggedIn) {
//         navigate("/");
//     }
//       const {LogoutUser}=useAuth();
  
//     const handleLogout=async()=>{
//       await LogoutUser();
//       navigate("/login")
//       window.location.reload();
//     }

//     return (
//         <div className="profile-container">
//             <h1>Profile</h1>
//             <Order />
//             <button onClick={handleLogout} className='logout-button'>Logout</button>
//         </div>
//     )
// }

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from "./verify/Auth"
// import { useNavigate } from "react-router-dom";
// import "./Profile.css";
// import Order from './Order';

// const Profile = () => {
//   const { user, isLoggedIn } = useAuth();
//   const navigate = useNavigate();

//   // If the user is not logged in, redirect to the login page
//   if (!isLoggedIn) {
//     navigate("/login");
//   }

//   const { LogoutUser } = useAuth();

//   const handleLogout = async () => {
//     await LogoutUser();
//     navigate("/login")
//     window.location.reload();
//   }

//   return (
//     <div className="profile-container">
//       <h1>Profile</h1>
//       <Order user={user} /> {/* Pass the user as a prop */}
//       <button onClick={handleLogout} className='logout-button'>Logout</button>
//     </div>
//   )
// }

// export default Profile;


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

  // If the user is not logged in, redirect to the login page
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
      <Order user={user} /> {/* Pass the user as a prop */}
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  )
}

export default Profile;