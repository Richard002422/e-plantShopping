import React from "react";
import ReactDOM from "react-dom/client";
// The Provider component from the react-redux library is already imported. This component allows all components in the application to access the Redux store.
import { Provider } from "react-redux";

import App from "./App.jsx";
// The Redux store is imported from the store.js file. This store maintains the application state, using the reducer defined in the CartSlice.jsx file.
import store from "./store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* The App component is wrapped with the Provider component, with the Redux store passed as a prop. This allows all components in the application to access and interact with the global state managed by Redux. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

