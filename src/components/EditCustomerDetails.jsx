import React, { useState } from 'react';
import { useAuth } from './verify/Auth';
import axios from 'axios';

const EditCustomerDetails = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState(user.address);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { name, address };
            await axios.put(`/api/users/${user._id}`, updatedUser);
            // Handle success
            console.log('User details updated successfully');
        } catch (error) {
            // Handle error
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditCustomerDetails;
