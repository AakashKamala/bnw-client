import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { baseURL } from '../../url';
import { useAuth } from './verify/Auth';

function Cart() {
  const [products, setProducts] = useState([]); // Change state variable to hold products
  const { user } = useAuth();
  const userId = user._id;

  useEffect(() => {
    // Fetch product IDs for the user
    fetch(`${baseURL}/api/cart/indi?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // For each product ID, fetch the product details and store them in state
        const fetchProducts = async () => {
          const productsData = await Promise.all(data.map(productId =>
            axios.get(`${baseURL}/api/products/${productId}`)
          ));
          setProducts(productsData.map(response => response.data));
        };
        fetchProducts();
      })
      .catch(error => {
        console.error('Error fetching product IDs:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Products in Cart for User {userId}</h2>
      <ul>
        {/* Map through products and render their details */}
        {products.map(product => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
      <div className="cart">
        <h2>Shopping Cart</h2>
        <div className="cart-total">
          <p>Total: ${
            // Calculate total price by summing up prices of all products
            products.reduce((total, product) => total + product.price, 0)
          }</p>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
