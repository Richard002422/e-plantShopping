// Importing necessary functions and files:
// The configureStore() function from the @reduxjs/toolkit package is imported to configure the Redux store.
// The cartReducer from the CartSlice.jsx file is imported, which manages the state slice related to the shopping cart.
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Store Configuration:
// The configureStore() function is used to configure the Redux store.
// Within the configuration object passed to configureStore(), the reducer key specifies the reducer functions. In this case, cartReducer is assigned to manage the cart portion of the state.
// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
  // Define the root reducer object
  reducer: {
    // 'cart' is the name of the slice in the store, and it's managed by cartReducer
    cart: cartReducer,
  },
});

// Exporting the Store:
// The configured Redux store is exported using export default store; so it can be used throughout the application to manage state.
export default store;
