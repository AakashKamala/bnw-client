import React, { useState } from 'react';
import { useContext } from 'react';
import { useAuth } from './verify/Auth';
import axios from 'axios';
import "./EditCustomerDetails.css"
import { OrderContext } from './ProductDetails';
import { baseURL } from '../../url';
import { useNavigate } from 'react-router-dom';

const EditCustomerDetails = () => {
    const { user } = useAuth();
    const { userId, productId, selectedSize, quantity, totalPrice} = useContext(OrderContext);
    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState(user.address);
    const navigate=useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { name, address, userId, productId, size:selectedSize, quantity, totalPrice };
            await axios.post(`${baseURL}/api/orders`, updatedUser);
            // Handle success
            console.log('order placed successfully');
            navigate("/checkout")
        } catch (error) {
            // Handle error
            console.error('Error placing orders:', error);
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
                <div>
                    <label htmlFor="house">House:</label>
                    <input
                        type="text"
                        id="house"
                        name="house"
                        value={address.house}
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <label htmlFor="locality">Locality:</label>
                    <input
                        type="text"
                        id="locality"
                        name="locality"
                        value={address.locality}
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleAddressChange}
                    />
                </div>
                <button className='pay-button' type="submit">Proceed to payment</button>
            </form>
        </div>
    );
};

export default EditCustomerDetails;
