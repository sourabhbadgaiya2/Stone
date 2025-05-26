import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import productReducer from "./product/productSlice";
import alertsReducer from "./alertSlice";

const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
