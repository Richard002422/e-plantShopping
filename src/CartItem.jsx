import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1)); // "$10.00" -> 10.00
      total += cost * quantity;
    });

    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // ✅ "+" usando addItem(item) (incrementa si ya existe)
  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  // ✅ "-" usando updateQuantity (y si llega a 0, elimina)
  const handleDecrement = (item) => {
    const newQty = item.quantity - 1;

    if (newQty >= 1) {
      dispatch(updateQuantity({ name: item.name, quantity: newQty }));
    } else {
      dispatch(removeItem(item.name)); // <- string, como tu pista
    }
  };

  // ✅ Eliminar directo
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // <- string
  };

  // ✅ Cambiar cantidad con input (si es 0 o inválido, elimina)
  const handleInputChange = (item, e) => {
    const value = Number(e.target.value);

    if (!Number.isFinite(value)) return;

    if (value >= 1) {
      dispatch(updateQuantity({ name: item.name, quantity: value }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
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

                {/* ✅ Ahora es input controlado (como tu ejemplo) */}
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
