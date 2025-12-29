import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // <- Aquí se guardan los productos del carrito
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const name = action.payload; // dispatch(removeItem(item.name))
      state.items = state.items.filter((item) => item.name !== name);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const itemToUpdate = state.items.find((item) => item.name === name);
      if (!itemToUpdate) return;

      // Evita cantidades menores a 1
      itemToUpdate.quantity = Math.max(1, quantity);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;