import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICategory } from '../types/category.types';

const initialState: ICategory = {
  items: [],
  hasNext: false,
  totalPages: 0,
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
});
