import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from '@prisma/client';

@Controller('')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('/foods')
  async getAllFoods(): Promise<Food[]> {
    return this.foodService.foods();
  }

  @Post('/foods/filter-by-category-id')
  async filterFoodByCategoryId(@Body() { categoryId }): Promise<Food[]> {
    return this.foodService.filterFoodByCategory({
      categoryId: Number(categoryId),
    });
  }
}
