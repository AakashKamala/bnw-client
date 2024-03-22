import React, { useState } from 'react';
import { useAuth } from './verify/Auth';
import axios from 'axios';
import "./EditCustomerDetails.css"
import { baseURL } from '../../url';
import { useNavigate } from 'react-router-dom';

const EditCustomerDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState({ ...user.address });
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { 
                _id: user._id,
                name,
                address
            };
            await axios.put(`${baseURL}/api/users/${user._id}`, updatedUser);
            console.log('User details updated successfully');
            navigate("/checkout");
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <div>
            <h2>Edit Customer Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                {Object.keys(address).map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={address[key]}
                            onChange={handleAddressChange}
                        />
                    </div>
                ))}
                <button className='pay-button' type="submit">Proceed to payment</button>
            </form>
        </div>
    );
};

export default EditCustomerDetails;