import { Food } from '@/interfaces';

export const getAllProductsIds = (products: Food[]) => {
  return products.map(product => product.id);
};
