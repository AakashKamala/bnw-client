import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import { Link } from 'react-router-dom';
import { useAuth } from './verify/Auth';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${_id}`);
        setProduct(response.data);
        setTotal(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [_id]);

  useEffect(() => {
    setTotal(quantity * (product ? product.price : 0));
  }, [quantity, product]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
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

  const {user}=useAuth();
  const navigate=useNavigate();
  console.log(user._id)

  const formData={
    userId:user._id,
    productId:_id
  };

  const handleCart=async()=>{
    if(!user)
    {
      navigate("/signup");
    }
    else{
      try {
        const res=await fetch(`http://localhost:5000/api/cart`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        // console.log(formData)
        console.log(res);
        if(res.status==204)
        {
          alert("item already in cart");
          navigate("/cart");
          return;
        }
        if(res.ok)
        {
          console.log("item added to cart successfully");
          alert("item added to cart successfully");
          navigate("/cart");
        }
        else{
          console.log("couldn't add to cart");
        }
      } catch (error) {
        console.log("error from add to cart: ",error);
      }
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
                <button className={selectedSize === 'S' ? 'selected' : ''} onClick={() => handleSizeSelect('S')}>S</button>
                <button className={selectedSize === 'M' ? 'selected' : ''} onClick={() => handleSizeSelect('M')}>M</button>
                <button className={selectedSize === 'L' ? 'selected' : ''} onClick={() => handleSizeSelect('L')}>L</button>
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
          <Link to="/buy"><button className='cartnbuy-button'>Buy</button></Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
