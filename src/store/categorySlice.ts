import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../axiosInstance';
import { ICategory, ICategorySmallResponseDto } from '../types/category.types';

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
      const response = await axiosInstance.get(
        `/admin/categories?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Error fetching categories'
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (
    categoryData: { name: string; description: string; slug: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        '/admin/categories',
        categoryData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error creating category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/categories/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error deleting category');
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
      })
      .addCase(createCategory.pending, (state) => {})
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<ICategorySmallResponseDto>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(createCategory.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(deleteCategory.pending, (state) => {})
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (item) => item.id.toString() !== action.payload
          );
        }
      )
      .addCase(deleteCategory.rejected, (state, action) => {
        console.error(action.payload);
      });
  },
});

export default slice.reducer;
