import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../url';
import { useAuth } from './verify/Auth';
import "./Cart.css"
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const { user, isLoggedIn, fetchUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const [products, setProducts] = useState([]);
  const userId = user._id;

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${baseURL}/api/cart/indi?userId=${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const fetchProducts = async () => {
            const productsData = await Promise.all(data.map(productId => axios.get(`${baseURL}/api/products/${productId}`)));
            setProducts(productsData.map(response => response.data));
          };
          fetchProducts();
        })
        .catch(error => {
          console.error('Error fetching product IDs:', error);
        });
    } else {
      setProducts([]);
    }
  }, [isLoggedIn, userId]);

  return (
    <div className='product-container'>
      <div className='product-list'>
        <ul>
          {products.map(product => (
            <li className='product-card' key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className='product-image' />
                <h3 className='product-name'>{product.name}</h3>
                <p>{product.description}</p>
                <p className='product-price'>${product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cart;