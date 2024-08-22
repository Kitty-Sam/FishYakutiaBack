import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Food, GetProducts, ProductsState } from '@/interfaces';

export const initialState: ProductsState = {
  products: [],
  totalProductsPages: 1,
  loading: false,
  error: '',
  createProductError: '',
  deleteProductsError: '',
};

export const productsReducer = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {
    getProductsPending: (state) => {
      state.loading = true;
      state.error = '';
    },
    getProductsSuccess: (state, action: PayloadAction<GetProducts>) => {
      state.loading = false;
      state.error = '';
      state.products = action.payload.foods.filter(food => !food.isDeleted);
      state.totalProductsPages = action.payload.totalFoodsPages;
    },
    getProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductsSuccess: (state, action: PayloadAction<Food>) => {
      state.createProductError = '';
      state.products.push(action.payload);
    },
    createProductsFailure: (state, action: PayloadAction<string>) => {
      state.createProductError = action.payload;
    },
    deleteProductsSuccess: (state, action: PayloadAction<number[]>) => {
      state.products = state.products.filter(product => !action.payload.includes(product.id));
    },
    deleteProductsFailure: (state, action: PayloadAction<string>) => {
      state.deleteProductsError = action.payload;
    },
  },
});

export const {
  getProductsPending,
  getProductsSuccess,
  getProductsFailure,
  createProductsSuccess,
  createProductsFailure,
  deleteProductsSuccess,
  deleteProductsFailure
} = productsReducer.actions;
