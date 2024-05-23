import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import imageReducer from './images'; // Correct import statement
import { getImages } from './images';
import axios from 'axios';

jest.mock('../utils/axios', () => ({
  get: jest.fn(),
}));

describe('Redux Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        images: imageReducer,
      },
      middleware: [thunk],
    });
  });

  test('getImages action creator success', async () => {
    const responseData = [{ id: 1, title: 'Test Image' }];
    axios.get.mockResolvedValueOnce({ data: responseData });

    await store.dispatch(getImages({ page: 1, limit: 10 }));

    const state = store.getState().images;
    expect(state.loading).toBe(false);
    expect(state.images).toEqual(responseData);
  });

  test('getImages action creator failure', async () => {
    const errorMessage = 'Error fetching images';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(getImages({ page: 1, limit: 10 }));

    const state = store.getState().images;
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(errorMessage);
  });

  test('store', () => {
    expect(store.getState()).toBeDefined(); // Add a simple test to check if store is defined
  });
});
