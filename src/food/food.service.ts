import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateFoodDto } from './dto/create-food-dto';
import { FoodWithCategory } from '../category/interfaces';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  async foods(
    page: number,
  ): Promise<{ foods: FoodWithCategory[]; totalFoodsPages: number }> {
    const pageSize = 50;
    const skip = (page - 1) * pageSize;
    const totalFoods = await this.prisma.food.count();
    const totalFoodsPages = Math.ceil(totalFoods / pageSize);

    const foods = await this.prisma.food.findMany({
      skip: skip,
      take: pageSize,
    });

    const categoryIds = foods.map((food) => food.categoryId);

    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    const foodsWithCategories = foods.map((food) => {
      const category = categories.find(
        (category) => category.id === food.categoryId,
      );
      return { ...food, category };
    });

    return {
      foods: foodsWithCategories,
      totalFoodsPages,
    };
  }

  async createFood(foodDto: CreateFoodDto): Promise<Food> {
    return this.prisma.food.create({
      data: foodDto,
    });
  }

  async deleteFood(params: { id: number }): Promise<Food> {
    return this.prisma.food.delete({
      where: {
        id: params.id,
      },
    });
  }

  async filterFoodByCategory(params: { categoryId: number }): Promise<Food[]> {
    const { categoryId } = params;
    return this.prisma.food.findMany({
      where: {
        categoryId,
      },
    });
  }

  async filterFoodByTitle(params: { title: string }): Promise<Food[]> {
    const { title } = params;
    return this.prisma.food.findMany({
      where: {
        name: title,
      },
    });
  }
}
