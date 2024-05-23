import { configureStore } from "@reduxjs/toolkit";
import { imageReducer } from "./images";

const store = configureStore({
  reducer: {
    image: imageReducer,
  },
  devTools: true, // Enable Redux DevTools
});

export default store;
