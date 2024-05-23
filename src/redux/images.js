import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export const getImages = createAsyncThunk(
  "images/get-images",
  async (formData, thunkAPI) => {
    try {
      const { page, limit } = formData;
      const response = await axios.get(
        `photos?_page=${page || ""}&_limit=${limit || ""}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    loading: false,
  },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getImages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.loading = false;
      state.images = action.payload;
    });
    builder.addCase(getImages.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: imageReducer, actions } = imageSlice;
export const { setImages } = actions;

export default imageReducer;
