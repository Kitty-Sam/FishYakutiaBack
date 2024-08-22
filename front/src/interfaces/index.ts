export interface RootState {
  currentUser: string;
  error: string;
  loading: boolean;
  activeTab: Tabs;
}

export interface ProductsState {
  products: Food[];
  totalProductsPages: number;
  loading: boolean;
  error: string;
  createProductError: string;
  deleteProductsError: string;
}

export interface ModalsState {
  modal: ModalsType | null;
}

export interface CategoriesState {
  categories: Category[];
  error: string;
}

export interface SettingsState {
  id: number;
  delivery: string;
  description: string;
  email: string;
  image: Image;
  error: string;
}

export interface Settings {
  id: number;
  delivery: string;
  description: string;
  email: string;
  image: Image;
}

export interface FormData {
  email: string;
  password: string;
}

export enum Tabs {
  ORDERS = '/orders',
  MENU = '/menu',
  SETTINGS = '/settings',
}

export enum ModalsType {
  ADD_CATEGORY = 'ADD_CATEGORY',
  EDIT_CATEGORIES = 'EDIT_CATEGORIES',
  ADD_PRODUCT = 'ADD_PRODUCT',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortField {
  ID = 'id',
  PRICE = 'price',
  CATEGORYID = 'categoryId',
  NAME = 'name'
}

export interface Image {
  id: number;
  filename: string;
  path: string;
}

export interface Food {
  id: number;
  name: string;
  images: Image[];
  price: string;
  isDeleted: boolean;
  category: Category;
}

export interface Foods {
  id: number;
  foodCount: number;
  food: Food;
}

interface Order {
  id: number;
  createdAt: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  paymentMethod: string;
  comment: string;
  totalAmount: string;
  foods: Foods[];
}

export interface Orders {
  [key: string]: Order[];
}

export interface GetOrders {
  orders: Orders[];
  totalOrders: number;
}

export interface GetProducts {
  foods: Food[];
  totalFoodsPages: number;
}

export interface GetProductsPayload {
  page: number;
  sortOrder: SortOrder;
  sortField: SortField;
}

export interface Category {
  id: number;
  title: string;
}

export interface CreateCategoryData {
  title: string;
}

export interface CreateCategoryResponseData {
  id: number;
  title: string;
}

export interface CreateProductData {
  name: string;
  image: File;
  price: string;
  categoryId: string;
}

export interface DeleteProductsData {
  userIds: number[];
}

export interface UpdateSettingsData {
  id: number;
  delivery: string;
  description: string;
  email: string;
  image: File;
}
