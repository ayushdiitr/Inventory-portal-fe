import { configureStore } from "@reduxjs/toolkit";
import user from "./authSlice";
import modal from "./modalSlice"

const store = configureStore({
  reducer: {
    user,
    modal
  },
});

export default store;
