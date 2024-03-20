// import {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "./verify/Auth";


const Logout = () => {

  const { isLoggedIn, LogoutUser } = useAuth();
  // const navigate = useNavigate();

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
      return <Navigate to="/login" />;
  }

  // useEffect(()=>{
  //   LogoutUser();
  // },[LogoutUser]);

  const handleLogout=async()=>{
    await LogoutUser();
    // window.location.reload();
  }

  // return <Navigate to="/login" />;
  return(
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Logout;
