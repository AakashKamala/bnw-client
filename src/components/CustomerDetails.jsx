import React, { useState } from 'react';
import "./SignupForm.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from './verify/Auth';
import { baseURL } from '../../url';
import { Link } from 'react-router-dom';

function CustomerDetails() {

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    // If the user is already logged in, redirect to home page
    if (isLoggedIn) {
        navigate("/");
    }

    const [formData, setFormData] = useState({
        name: '',
        address:{
            house: '',
            locality: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
        },
        dateOfBirth: '',
        gender: '',
        password: ''
    });

    const {storeTokenInLS}=useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formData);

        try {
            const response=await fetch(`${baseURL}/api/auth`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
              },
              body: JSON.stringify(formData),
            })
      
            const res_data=await response.json();
            if(response.ok)
            {
              storeTokenInLS(res_data.token);
              setFormData({name: '',
              address:{
                house: '',
                locality: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
            },
              dateOfBirth: '',
              gender: '',
              password: ''});
            // console.log(res_data.token);
            // console.log(res_data);
            navigate("/customer-email", { state: { userId: res_data.userId }});
            }
            else{
              alert("error while signing up");
            }
      
          } catch (error) {
            // console.log("signup ",error);
          }
      

        
    };

    return (
        <div>
            <p>Have am account, <Link to='/customer-login'><span>Login</span></Link></p>
            <div className='signup-container'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="house" name="address.house" placeholder="House No./Name" value={formData.address.house} onChange={handleChange} required />
                    <input type="text" id="locality" name="address.locality" placeholder="Locality" value={formData.address.locality} onChange={handleChange} required />
                    <input type="text" id="city" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} required />
                    <input type="text" id="state" name="address.state" placeholder="State" value={formData.address.state} onChange={handleChange} required />
                    <input type="text" id="country" name="address.country" placeholder="Country" value={formData.address.country} onChange={handleChange} required />
                    <input type="text" id="pincode" name="address.pincode" placeholder="Pin Code" value={formData.address.pincode} onChange={handleChange} required />
                    
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    <input type="submit" value="Next" />
                </form>
            </div>
        </div>
    );
}

export default CustomerDetails;
