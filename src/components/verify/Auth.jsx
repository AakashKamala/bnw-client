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
//     setUser("");
//     return localStorage.removeItem("token");
//   };

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


import React, { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../../../url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
  };

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
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
    setLoading(false); // Set loading to false after authentication check
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setLoading(false); // Set loading to false if there's no token
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, storeTokenInLS, LogoutUser, user }}>
      {!loading && children} {/* Render children only when loading is false */}
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
