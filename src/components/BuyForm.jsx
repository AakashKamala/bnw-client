// import CustomerDetails from "./CustomerDetails";
// import { useAuth } from "./verify/Auth"
// import { useNavigate } from "react-router-dom";

// const BuyForm = () => {

//   const {user}=useAuth();
//   const navigate=useNavigate();

//   if(!user)
//   {
//     navigate("/customer-details");
//   }

//   const handleEdit=()=>{
//     navigate("/edit-customer-details")
//   };

//   const handlePay=()=>{
//     navigate("/checkout")
//   }

//   return (
//     <div>
//       <div>BuyForm</div>
//       <div><button onClick={handlePay}>confirm details and pay</button><button onClick={handleEdit}>Edit details</button></div>
//       {/* <CustomerDetails /> */}
//     </div>
//   )
// }

// export default BuyForm


import CustomerDetails from "./CustomerDetails";
import { useAuth } from "./verify/Auth"
import { useNavigate } from "react-router-dom";
import "./BuyForm.css";

const BuyForm = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/customer-details");
  }

  const handleEdit = () => {
    navigate("/edit-customer-details")
  };

  const handlePay = () => {
    navigate("/checkout")
  }

  return (
    <div className="buy-form-container">
      <div>
        <button onClick={handlePay}>confirm details and pay</button>
        <button onClick={handleEdit}>Edit details</button>
      </div>
      {/* <CustomerDetails /> */}
    </div>
  )
}

export default BuyForm;
