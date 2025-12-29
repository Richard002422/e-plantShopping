// Importar la función configureStore desde Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Importar el reducer del carrito desde CartSlice
import cartReducer from './CartSlice';

// Crear la tienda de Redux usando configureStore
const store = configureStore({
  // Definir el objeto de reducers raíz
  reducer: {
    // 'cart' es el nombre del slice en el store
    // y es gestionado por cartReducer
    cart: cartReducer,
  },
});

// Exportar la tienda para usarla en toda la aplicación
// (por ejemplo, en <Provider store={store}>)
export default store;
