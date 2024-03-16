// import { useEffect, useState } from 'react';

// function Cart() {
//   const [productIds, setProductIds] = useState([]);
//   const userId = "65f2db606ddc5726f15db896";

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/cart/indi?userId=${userId}`)
//       .then(response => response.json())
//       .then(data => {
//         // Assuming the API returns an array of product IDs
//         setProductIds(data.map(item => item.productId));
//       })
//       .catch(error => {
//         console.error('Error fetching product IDs:', error);
//       });
//   }, [userId]);

//   return (
//     <div>
//       <h2>Product IDs for User {userId}</h2>
//       <ul>
//         {productIds.map(productId => (
//           <li key={productId}>{productId}</li>
//         ))}
//       </ul>
//       <div className="cart">
//        <h2>Shopping Cart</h2>
//        <div className="cart-total">
//          <p>Total: $0.00</p>
//          <button>Checkout</button>
//        </div>
//      </div>
//     </div>
//   );
// }

// export default Cart;


import { useEffect, useState } from 'react';
import { baseURL } from '../../url';

function Cart() {
  const [productIds, setProductIds] = useState([]);
  const userId = "65f2db606ddc5726f15db896";

  useEffect(() => {
    fetch(`${baseURL}/api/cart/indi?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProductIds(data);
      })
      .catch(error => {
        console.error('Error fetching product IDs:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Product IDs for User {userId}</h2>
      <ul>
        {productIds.map(productId => (
          <li key={productId}>{productId}</li>
        ))}
      </ul>
      <div className="cart">
        <h2>Shopping Cart</h2>
        <div className="cart-total">
          <p>Total: $0.00</p>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
