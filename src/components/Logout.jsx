// import {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "./verify/Auth";


const Logout = () => {

    const {LogoutUser}=useAuth();
    const navigate=useNavigate();

    if(!useAuth.user)
    {
      navigate("/login");
    }

  // useEffect(()=>{
  //   LogoutUser();
  // },[LogoutUser]);

  const handleLogout=async()=>{
    await LogoutUser();
    window.location.reload();
  }

  // return <Navigate to="/login" />;
  return(
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Logout;
