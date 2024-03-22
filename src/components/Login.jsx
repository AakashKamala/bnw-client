// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./verify/Auth";
// import { Link } from "react-router-dom";
// import { baseURL } from "../../url";
// import "./Login.css";

// const Login = () => {

//     const navigate = useNavigate();
//     const [user, setUser] = useState({
//         email: "",
//         password: "",
//     });

//     const { storeTokenInLS } = useAuth();

//     const handleInput = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;

//         setUser({
//             ...user,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(`${baseURL}/api/auth/login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(user),
//             });

//             const res_data = await response.json();

//             if (response.ok) {
//                 storeTokenInLS(res_data.token);
//                 setUser({ email: "", password: "" });
//                 navigate("/");
//             } else {
//                 console.error("Invalid credentials");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//         }
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         id="email"
//                         required
//                         autoComplete="off"
//                         value={user.email}
//                         onChange={handleInput}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         id="password"
//                         required
//                         autoComplete="off"
//                         value={user.password}
//                         onChange={handleInput}
//                     />
//                 </div>

//                 <br />

//                 <button type="submit">Login</button>
//             </form>

//             <p>New user? <Link to='/signup'>SignUp</Link></p>
//         </div>
//     );
// }

// export default Login;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./verify/Auth";
import { Link } from "react-router-dom";
import { baseURL } from "../../url";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { storeTokenInLS, isLoggedIn } = useAuth(); // Include isLoggedIn from useAuth

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseURL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();

            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({ email: "", password: "" });
                navigate("/");
            } else {
                console.error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); // Redirect if user is already logged in
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        id="email"
                        required
                        autoComplete="off"
                        value={user.email}
                        onChange={handleInput}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        id="password"
                        required
                        autoComplete="off"
                        value={user.password}
                        onChange={handleInput}
                    />
                </div>

                <br />

                <button type="submit">Login</button>
            </form>

            <p>New user? <Link to='/signup'>SignUp</Link></p>
        </div>
    );
}

export default Login;
