import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriesState, Category, CreateCategoryResponseData } from '@/interfaces';

export const initialState: CategoriesState = {
  categories: [],
  error: ''
};

export const categoriesReducer = createSlice({
  name: 'categoriesReducer',
  initialState,
  reducers: {
    getCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.error = '';
    },
    getCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    createCategorySuccess: (state, action: PayloadAction<CreateCategoryResponseData>) => {
      state.categories.push(action.payload);
      state.error = '';
    },
    createCategoryFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deleteCategorySuccess: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
      state.error = '';
    },
    deleteCategoryFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  getCategoriesSuccess,
  getCategoriesFailure,
  createCategorySuccess,
  createCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure
} = categoriesReducer.actions;
