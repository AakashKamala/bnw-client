import CustomerDetails from "./CustomerDetails";
import { useAuth } from "./verify/Auth"
import { useNavigate } from "react-router-dom";

const BuyForm = () => {

  const {user}=useAuth();
  const navigate=useNavigate();

  const handleEdit=()=>{
    navigate("/edit-customer-details")
  };

  const handlePay=()=>{
    navigate("/checkout")
  }

  return (
    <div>
      <div>BuyForm</div>
      {user&&<div><button onClick={handlePay}>confirm details and pay</button><button onClick={handleEdit}>Edit details</button></div>}
      {!user&&<CustomerDetails />}
    </div>
  )
}

export default BuyForm