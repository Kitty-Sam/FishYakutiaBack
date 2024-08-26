import { Category, Food } from '@prisma/client';

export interface FoodWithCategory extends Food {
  category: Category;
}
