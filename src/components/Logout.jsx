// // import {useEffect} from "react";
// import {Navigate, useNavigate} from "react-router-dom";
// import { useAuth } from "./verify/Auth";


// const Logout = () => {

//   const { isLoggedIn, LogoutUser } = useAuth();
//   // const navigate = useNavigate();

//   // If the user is not logged in, redirect to the login page
//   if (!isLoggedIn) {
//       return <Navigate to="/login" />;
//   }

//   // useEffect(()=>{
//   //   LogoutUser();
//   // },[LogoutUser]);

//   const handleLogout=async()=>{
//     await LogoutUser();
//     // window.location.reload();
//   }

//   // return <Navigate to="/login" />;
//   return(
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }
// export default Logout;



// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./verify/Auth";

// const Logout = () => {
//   const { isLoggedIn, LogoutUser } = useAuth();

//   const handleLogout = async () => {
//     await LogoutUser();
//   };

//   // If the user is not logged in, redirect to the login page
//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Logout;



// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./verify/Auth";

// const Logout = () => {
//   const { isLoggedIn, LogoutUser } = useAuth();

//   useEffect(() => {
//     LogoutUser();
//   }, [LogoutUser]);

//   // If the user is not logged in, redirect to the login page
//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   return null; // Render nothing while logging out
// };

// export default Logout;



import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./verify/Auth";

const Logout = () => {
  const { isLoggedIn, LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return isLoggedIn ? null : <Navigate to="/login" />;
};

export default Logout;