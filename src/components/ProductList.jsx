import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ProductList.css"

const defaultProductList = [];

function ProductList() {
  const [products, setProducts] = useState(defaultProductList);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='product-container'>
      <div className='product-list'>
        {products.length === 0 ? (
          <div>No products found</div>
        ) : (
          products.map(product => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className='product-image' />
                <p className='product-name'>{product.name}</p>
                <p className='product-price'>${product.price}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;