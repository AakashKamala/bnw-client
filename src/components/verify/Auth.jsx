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




import React, { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../../../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setUser(""); // Reset the user state when logging out
    return localStorage.removeItem("token");
  };

  // Inside the AuthProvider component
// const [isLoggedIn, setIsLoggedIn] = useState(!!token);

// const LogoutUser = () => {
//   setToken("");
//   setUser(""); // Reset the user state when logging out
//   setIsLoggedIn(false); // Update the isLoggedIn state
//   return localStorage.removeItem("token");
// };

  const userAuthentication = async () => {
    try {
      const response = await fetch(`${baseURL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => {
          if (prevUser !== data.userData) {
            return data.userData;
          }
          return prevUser;
        });
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const fetchUserData = async () => {
    await userAuthentication();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};