import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // Initialize a total variable to maintain the cumulative sum
    let total = 0;

    // Iterate over the cart array using cart.forEach()
    cart.forEach((item) => {
      // For each article, extract its quantity and cost
      const quantity = item.quantity;
      // Convert the cost string (e.g., "$10.00") to a number using parseFloat(item.cost.substring(1)), then multiply it by the quantity
      const cost = parseFloat(item.cost.substring(1)); // "$10.00" -> 10.00
      // Add the resulting value to total
      total += cost * quantity;
    });

    // After processing all articles, return the final sum of total
    return total.toFixed(2);
  };

  // Users should be able to return to the plant listing page to continue shopping while on the shopping cart page
  const handleContinueShopping = (e) => {
    // Call the onContinueShopping(e) function passed from the parent component
    onContinueShopping(e);
  };

  // Payment functionality - to be added in the future
  const handleCheckoutShopping = (e) => {
    // Alert the user that this functionality will be added at a later date
    alert('Functionality to be added for future reference');
  };

  // Increment the quantity of an item in the cart
  const handleIncrement = (item) => {
    // Dispatch updateQuantity to increase the item quantity by 1
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement the quantity of an item in the cart
  const handleDecrement = (item) => {
    const newQty = item.quantity - 1;

    // If the quantity is greater than 1, dispatch updateQuantity to decrease the quantity by 1
    if (newQty >= 1) {
      dispatch(updateQuantity({ name: item.name, quantity: newQty }));
    } else {
      // Otherwise, if the quantity would drop to 0, dispatch removeItem to remove the plant type from the cart
      dispatch(removeItem(item.name));
    }
  };

  // Remove a plant type from the cart completely
  const handleRemove = (item) => {
    // Dispatch removeItem action to remove the article from the cart
    dispatch(removeItem(item.name));
  };

  // Handle input change for quantity - allows direct quantity input
  const handleInputChange = (item, e) => {
    const value = Number(e.target.value);

    // If the value is not a valid number, return early
    if (!Number.isFinite(value)) return;

    // If value is greater than or equal to 1, update the quantity
    if (value >= 1) {
      dispatch(updateQuantity({ name: item.name, quantity: value }));
    } else {
      // Otherwise, remove the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  // Calculate the total cost of an item by multiplying its quantity by its unit price
  const calculateTotalCost = (item) => {
    // Extract the numeric value from the item's cost string using parseFloat(item.cost.substring(1)) before performing the multiplication
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <input
                  className="cart-item-quantity-input"
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(item, e)}
                />

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
