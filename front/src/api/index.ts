import axios from 'axios';
import {
  CreateCategoryData,
  CreateProductData,
  DeleteProductsData,
  FormData,
  GetProductsPayload,
  UpdateSettingsData,
} from '@/interfaces';

export const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const loginUser = async (loginData: FormData) => {
  try {
    const response = await instance.post('/auth/login', loginData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const me = async () => {
  try {
    const response = await instance.get('/auth/me');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await instance.post('/auth/logout');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await instance.get('/categories');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const createCategory = async (data: CreateCategoryData) => {
  try {
    const response = await instance.post('/add-category', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const response = await instance.delete(`/category/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const getProducts = async (payload: GetProductsPayload) => {
  try {
    const response = await instance.get(`/foods?page=${payload.page}&sortField=${payload.sortField}&sortOrder=${payload.sortOrder}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const createProduct = async (data: CreateProductData) => {
  try {
    const response = await instance.post(
        '/add-food',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteProducts = async (data: DeleteProductsData) => {
  try {
    const response = await instance.delete('/foods', { data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSettings = async () => {
  try {
    const response = await instance.get('/settings');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const updateSettings = async (data: UpdateSettingsData) => {
  try {
    const response = await instance.patch(
        '/settings',
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
