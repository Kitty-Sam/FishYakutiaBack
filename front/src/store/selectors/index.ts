import { AppRootState } from '@store/store';

export const getCurrentUser = (state: AppRootState) => state.auth.currentUser;
export const getActiveTab = (state: AppRootState) => state.auth.activeTab;
export const getLoginError = (state: AppRootState) => state.auth.error;
export const getCurrentModalType = (state: AppRootState) => state.modals.modal;
export const getCategories = (state: AppRootState) => state.categories.categories;
export const getCategoriesError = (state: AppRootState) => state.categories.error;
export const getProductsSelector = (state: AppRootState) => state.products.products;
export const getTotalProductsPagesCount = (state: AppRootState) => state.products.totalProductsPages;
export const getCreateProductError = (state: AppRootState) => state.products.createProductError;
export const getCreateProductLoading = (state: AppRootState) => state.products.loading;
export const getSettingsDataSelector = (state: AppRootState) => state.settings;


