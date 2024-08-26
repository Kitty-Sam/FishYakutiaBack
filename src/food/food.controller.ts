import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from '@prisma/client';
import { FoodWithCategory } from '../category/interfaces';

@Controller('')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('/foods')
  async getAllFoods(
    @Query('page', ParseIntPipe) page: number,
    @Query('sortField') sortField: keyof Food,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{ foods: FoodWithCategory[]; totalFoodsPages: number }> {
    return this.foodService.foods(page, sortField, sortOrder);
  }

  @Get('/foods-mobile')
  async getFoods(): Promise<Food[]> {
    return this.foodService.foodsMobile();
  }

  @Delete('foods')
  async deleteFoodById(
    @Body() deleteFoodsData: { userIds: number[] },
  ): Promise<number[]> {
    const { userIds } = deleteFoodsData;
    return await this.foodService.deleteFood(userIds);
  }

  @Post('/foods/filter-by-category-id')
  async filterFoodByCategoryId(@Body() { categoryId }): Promise<Food[]> {
    return this.foodService.filterFoodByCategory({
      categoryId: Number(categoryId),
    });
  }

  @Post('/foods/filter-by-title')
  async filterFoodByTitle(@Body() { title }): Promise<Food[]> {
    return this.foodService.filterFoodByTitle({
      title,
    });
  }

  @Post('/foods/filter-by-title-and-by-category')
  async filterFoodByTitleAndByCategory(
    @Body() { title, categoryId },
  ): Promise<Food[]> {
    return this.foodService.filterFoodByTitleAndByCategory({
      title,
      categoryId: Number(categoryId),
    });
  }
}
