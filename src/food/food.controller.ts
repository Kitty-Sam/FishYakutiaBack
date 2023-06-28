import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from '@prisma/client';
import { CreateFoodDto } from './dto/create-food-dto';
import { FoodWithCategory } from '../category/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Controller('')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('/foods')
  async getAllFoods(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<{ foods: FoodWithCategory[]; totalFoodsPages: number }> {
    return this.foodService.foods(page);
  }

  @Get('/foods-mobile')
  async getFoods(): Promise<Food[]> {
    return this.foodService.foodsMobile();
  }

  @Post('/add-food')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createFood(
    @UploadedFile()
    image: Express.Multer.File,
    @Body() createFoodDto: CreateFoodDto,
  ) {
    const foodDto = { ...createFoodDto, image };
    return await this.foodService.createFood(foodDto);
  }

  @Delete('food/:id')
  async deleteFoodById(@Param('id') id: string): Promise<Food> {
    return this.foodService.deleteFood({ id: Number(id) });
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
