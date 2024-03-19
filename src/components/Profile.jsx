// import { useAuth } from "./verify/Auth"
// import { useNavigate } from "react-router-dom";
// import Logout from "./Logout";

// const Profile = () => {
//     const {user}=useAuth();
//     const navigate=useNavigate();
//     if(!user)
//     {
//         navigate("/login")
//     }
//   return (
//     <div>
//         <h1>profile</h1>
//         <Logout />
//     </div>
//   )
// }

// export default Profile


import React from 'react';
import { useAuth } from "./verify/Auth"
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import "./Profile.css"; // Import CSS file

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    if (!user) {
        navigate("/login")
    }

      const {LogoutUser}=useAuth();
  
    const handleLogout=async()=>{
      await LogoutUser();
      navigate("/login")
      window.location.reload();
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <button onClick={handleLogout} className='logout-button'>Logout</button>
        </div>
    )
}

export default Profile;
