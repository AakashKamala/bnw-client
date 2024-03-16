import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomerEmail = () => {
  const location = useLocation();
  const Id = location.state.userId;
  console.log(Id)
  const [formData, setFormData] = useState({ userId: Id, email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.userId);
    console.log(formData.email);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      console.log(response)
      if (response.ok) {
        setFormData({ ...formData, email: '' });
        navigate('/checkout');
      } else {
        alert("error while email");
      }
    } catch (error) {
      console.log("error during email: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' id='email' value={formData.email} onChange={handleChange} />
        <input type='submit' value='Verify' />
      </form>
    </div>
  );
};

export default CustomerEmail;