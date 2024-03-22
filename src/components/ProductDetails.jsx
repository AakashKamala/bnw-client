import React, { useState, useEffect, createContext, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import { useAuth } from './verify/Auth';
import { baseURL } from '../../url';

export const OrderContext = createContext(null);

function ProductDetails() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { user, fetchUserData } = useAuth();
  const navigate = useNavigate();
  const { setOrderData } = useContext(OrderContext);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/products/${_id}`);
        setProduct(response.data);
        setTotal(response.data.price);
        setOrderData(prevOrderData => ({
          ...prevOrderData,
          productId: _id,
          totalPrice: response.data.price,
          selectedSize: 'S',
        }));
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [_id, setOrderData]);

  useEffect(() => {
    const updatedTotal = quantity * (product ? product.price : 0);
    setTotal(updatedTotal);
    setOrderData(prevOrderData => ({
      ...prevOrderData,
      total: updatedTotal,
      totalPrice: updatedTotal,
      quantity
    }));
  }, [quantity, product, setOrderData]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setOrderData(prevOrderData => ({
      ...prevOrderData,
      selectedSize: size
    }));
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCart = async () => {
    if (!user) {
      navigate("/signup");
    } else {
      const formData = {
        userId: user._id,
        productId: _id,
        size: selectedSize,
        quantity: quantity,
        totalPrice: total
      };

      setOrderData(prevOrderData => ({
        ...prevOrderData,
        ...formData
      }));

      try {
        const res = await fetch(`${baseURL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.status === 204) {
          alert("Item already in cart");
          navigate("/cart");
          return;
        }

        if (res.ok) {
          alert("Item added to cart successfully");
          navigate("/cart");
        } else {
          // Handle other responses
        }
      } catch (error) {
        // Handle error
      }
    }
  };


  const handleBuy=async()=>{
    if(!user)
    {
      navigate("/customer-details")
    }
    else{
      navigate("/buy")
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='product-details-container'>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <div className="details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <div>
            <label>Size:</label>
            <div className='size-wrapper'>
              <div className="size-options">
                <div className='size-options'>
                  <button className={selectedSize === 'S' ? 'selected' : ''} onClick={() => handleSizeSelect('S')} selected={selectedSize === 'S' ? 'true' : 'false'}>S</button>
                  <button className={selectedSize === 'M' ? 'selected' : ''} onClick={() => handleSizeSelect('M')} selected={selectedSize === 'M' ? 'true' : 'false'}>M</button>
                  <button className={selectedSize === 'L' ? 'selected' : ''} onClick={() => handleSizeSelect('L')} selected={selectedSize === 'L' ? 'true' : 'false'}>L</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Quantity:</label>
            <div>
              <button onClick={handleDecrement}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>
          <div>Total: ${total.toFixed(2)}</div>

          <button className='cartnbuy-button' onClick={handleCart}>Add to Cart</button>
          <button className='cartnbuy-button' onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;