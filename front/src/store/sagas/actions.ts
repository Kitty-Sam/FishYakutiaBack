import { createAction } from '@reduxjs/toolkit';
import { SagaActions } from '@store/sagas/types';
import {
  CreateCategoryData,
  CreateProductData,
  DeleteProductsData,
  GetProductsPayload,
  UpdateSettingsData
} from '@/interfaces';

export const login = createAction(SagaActions.LOGIN_USER);
export const me = createAction(SagaActions.ME);
export const logout = createAction(SagaActions.LOGOUT_USER);
export const getCategoriesAction = createAction(SagaActions.GET_CATEGORIES);
export const createCategoryAction = createAction<CreateCategoryData>(SagaActions.CREATE_CATEGORY);
export const deleteCategoryAction = createAction<number>(SagaActions.DELETE_CATEGORY);
export const getProductsAction = createAction<GetProductsPayload>(SagaActions.GET_PRODUCTS);
export const createProductAction = createAction<CreateProductData>(SagaActions.CREATE_PRODUCT);
export const deleteProductsAction = createAction<DeleteProductsData>(SagaActions.DELETE_PRODUCTS);
export const getSettingsAction = createAction(SagaActions.GET_SETTINGS);
export const updateSettingsAction = createAction<UpdateSettingsData>(SagaActions.UPDATE_SETTINGS);
