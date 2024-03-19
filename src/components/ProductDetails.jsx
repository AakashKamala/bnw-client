// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ProductDetails.css';
// import { Link } from 'react-router-dom';
// import { useAuth } from './verify/Auth';
// import { baseURL } from '../../url';

// export const OrderContext = createContext(null);

// function ProductDetails() {
//   const { _id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('S');
//   const [quantity, setQuantity] = useState(1);
//   const [total, setTotal] = useState(0);
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { setOrderData } = useContext(OrderContext);

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/products/${_id}`);
//         setProduct(response.data);
//         setTotal(response.data.price);
//         setOrderData(prevOrderData => ({
//           ...prevOrderData,
//           productId: _id,
//           totalPrice: response.data.price,
//           userId: user._id,
//           selectedSize: 'S', // Set default size in orderData
//         }));
//       } catch (error) {
//         // Handle error
//       }
//     };

//     fetchData();
//   }, [_id, setOrderData, user, navigate]);

//   useEffect(() => {
//     setTotal(quantity * (product ? product.price : 0));
//     setOrderData(prevOrderData => ({
//       ...prevOrderData,
//       total,
//       totalPrice: total * quantity,
//       quantity
//     }));
//   }, [quantity, product, total, setOrderData]);

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//     setOrderData(prevOrderData => ({
//       ...prevOrderData,
//       selectedSize: size
//     }));
//   };

//   const handleIncrement = () => {
//     if (quantity < 10) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleCart = async () => {
//     if (!user) {
//       navigate("/signup");
//     } else {
//       const formData = {
//         userId: user._id,
//         productId: _id,
//         size: selectedSize,
//         quantity: quantity,
//         totalPrice: total * quantity
//       };

//       setOrderData(prevOrderData => ({
//         ...prevOrderData,
//         ...formData
//       }));

//       try {
//         const res = await fetch(`${baseURL}/api/cart`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });

//         if (res.status === 204) {
//           alert("Item already in cart");
//           navigate("/cart");
//           return;
//         }

//         if (res.ok) {
//           alert("Item added to cart successfully");
//           navigate("/cart");
//         } else {
//           // Handle other responses
//         }
//       } catch (error) {
//         // Handle error
//       }
//     }
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='product-details-container'>
//       <div className="product-details">
//         <img src={product.image} alt={product.name} />
//         <div className="details">
//           <h2>{product.name}</h2>
//           <p>{product.description}</p>
//           <p>Price: ${product.price}</p>
//           <div>
//             <label>Size:</label>
//             <div className='size-wrapper'>
//               <div className="size-options">
//                 <button className={selectedSize === 'S' ? 'selected' : ''} onClick={() => handleSizeSelect('S')}>S</button>
//                 <button className={selectedSize === 'M' ? 'selected' : ''} onClick={() => handleSizeSelect('M')}>M</button>
//                 <button className={selectedSize === 'L' ? 'selected' : ''} onClick={() => handleSizeSelect('L')}>L</button>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label>Quantity:</label>
//             <div>
//               <button onClick={handleDecrement}>-</button>
//               <span>{quantity}</span>
//               <button onClick={handleIncrement}>+</button>
//             </div>
//           </div>
//           <div>Total: ${total.toFixed(2)}</div>

//           <button className='cartnbuy-button' onClick={handleCart}>Add to Cart</button>
//           <Link to="/buy"><button className='cartnbuy-button'>Buy</button></Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;


import React, { useState, useEffect, createContext, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setOrderData } = useContext(OrderContext);

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
          selectedSize: 'S', // Set default size in orderData
        }));
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [_id, setOrderData]);

  useEffect(() => {
    setTotal(quantity * (product ? product.price : 0));
    setOrderData(prevOrderData => ({
      ...prevOrderData,
      total,
      totalPrice: total * quantity,
      quantity
    }));
  }, [quantity, product, total, setOrderData]);

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
    const formData = {
      productId: _id,
      size: selectedSize,
      quantity: quantity,
      totalPrice: total * quantity
    };

    setOrderData(prevOrderData => ({
      ...prevOrderData,
      ...formData
    }));

    if (user) {
      navigate("/buy");
    } else {
      navigate("/customer-details");
    }
  };

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
          {user ? (
            <Link to="/buy"><button className='cartnbuy-button'>Buy</button></Link>
          ) : (
            <Link to="/customer-details"><button className='cartnbuy-button'>Buy</button></Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
