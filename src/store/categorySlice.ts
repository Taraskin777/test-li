import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICategory } from '../types/category.types';

const initialState: ICategory = {
  items: [],
  hasNext: false,
  totalPages: 0,
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (
    { page, size }: { page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `PUBLIC_API_URL/admin/categories?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching categories'
      );
    }
  }
);

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {})
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.items = action.payload.items;
          state.hasNext = action.payload.hasNext;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});



export default slice.reducer;