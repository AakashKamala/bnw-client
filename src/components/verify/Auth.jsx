// import {createContext, useContext, useEffect, useState} from "react";
// import { baseURL } from "../../../url";

// export const AuthContext=createContext();

// export const AuthProvider=({children})=>{

//     const [token,setToken]=useState(localStorage.getItem("token"));
//     const [user,setUser]=useState("");

//     const storeTokenInLS=(serverToken)=>{
//         setToken(serverToken);
//         return localStorage.setItem("token",serverToken);
//     };


//     let isLoggedIn=!!token;

//     const LogoutUser=()=>{
//         setToken("");
//         return localStorage.removeItem("token");
//     };

//     // const userAuthentication=async()=>{
//     //     try {
//     //         const response=await fetch(`${baseURL}/api/auth/user`,{
//     //             method:"GET",
//     //             headers:{
//     //                 Authorization:`Bearer ${token}`,
//     //             }
//     //         });
//     //         if(response.ok){
//     //             const data=await response.json();
//     //             // console.log("user data",data.userData);
//     //             setUser(data.userData);
//     //         }
//     //     } catch (error) {
//     //         // console.error("Error fetching user data");
//     //     }
//     // }

//     const userAuthentication = async () => {
//         try {
//           const response = await fetch(`${baseURL}/api/auth/user`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (response.ok) {
//             const data = await response.json();
//             // Introduce a state update to force re-render
//             setUser((prevUser) => {
//               if (prevUser !== data.userData) {
//                 return data.userData;
//               }
//               return prevUser;
//             });
//           }
//         } catch (error) {
//           // console.error("Error fetching user data");
//         }
//       };



//     useEffect(()=>{
//         userAuthentication();
//     },[]);

//     return <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user}}>
//         {children}
//     </AuthContext.Provider>
// };

// export const useAuth=()=>{
//     const authContextValue=useContext(AuthContext);
//     if(!authContextValue){
//         throw new Error("useAuth used outside of the Provider");
//     }
//     return authContextValue;
// }




// import React, { createContext, useContext, useEffect, useState } from "react";
// import { baseURL } from "../../../url";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState("");

//   const storeTokenInLS = (serverToken) => {
//     setToken(serverToken);
//     return localStorage.setItem("token", serverToken);
//   };

//   let isLoggedIn = !!token;

//   const LogoutUser = () => {
//     setToken("");
//     setUser(""); // Reset the user state when logging out
//     return localStorage.removeItem("token");
//   };

//   // Inside the AuthProvider component
// // const [isLoggedIn, setIsLoggedIn] = useState(!!token);

// // const LogoutUser = () => {
// //   setToken("");
// //   setUser(""); // Reset the user state when logging out
// //   setIsLoggedIn(false); // Update the isLoggedIn state
// //   return localStorage.removeItem("token");
// // };

//   const userAuthentication = async () => {
//     try {
//       const response = await fetch(`${baseURL}/api/auth/user`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setUser((prevUser) => {
//           if (prevUser !== data.userData) {
//             return data.userData;
//           }
//           return prevUser;
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching user data");
//     }
//   };

//   const fetchUserData = async () => {
//     await userAuthentication();
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, fetchUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the Provider");
//   }
//   return authContextValue;
// };


import React, { useEffect, useState } from 'react';
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
import Profile from './components/Profile';

import { useAuth } from './components/verify/Auth';
import EditCustomerDetails from './components/EditCustomerDetails';
import CustomerLogin from './components/CustomerLogin';
import Footer from './components/Footer';

function App() {
  const { isLoggedIn } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  // Subscribe to changes in isLoggedIn
  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

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
          <Route path="/login" element={<Login key={isAuthenticated ? 'loggedIn' : 'loggedOut'} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/email" element={<Email />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/customer-email" element={<CustomerEmail />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/edit-customer-details" element={<EditCustomerDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
