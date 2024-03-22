import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseURL } from '../../../url';
import "./Email.css"

const CustomerEmail = () => {
  const location = useLocation();
  const Id = location.state.userId;
  // console.log(Id)
  const [formData, setFormData] = useState({ userId: Id, email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/auth/email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      if (response.ok) {
        setFormData({ ...formData, email: '' });
        navigate('/buy');
      } else {
        alert("error while email");
      }
    } catch (error) {
      // console.log("error during email: ", error);
    }
  };

  return (
    <div className='email-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' id='email' value={formData.email} onChange={handleChange} />
        <input type='submit' value='Verify' />
      </form>
    </div>
  );
};

export default CustomerEmail;