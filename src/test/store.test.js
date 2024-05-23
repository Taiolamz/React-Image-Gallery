import { configureStore } from "@reduxjs/toolkit";
import store from "../redux/store";

describe('Redux Store Configuration', () => {
  test('Store is configured correctly', () => {
    expect(store).toBeDefined(); 
    expect(store.getState()).toEqual({ image: { /* Initial state of the image slice */ } }); 
    expect(store.dispatch).toBeDefined();
  });
});
