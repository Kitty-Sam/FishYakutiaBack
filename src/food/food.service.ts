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
    sortField: keyof Food,
    sortOrder: 'asc' | 'desc',
  ): Promise<{ foods: FoodWithCategory[]; totalFoodsPages: number }> {
    const pageSize = 50;
    const skip = (page - 1) * pageSize;
    const totalFoods = await this.prisma.food.count();
    const totalFoodsPages = Math.ceil(totalFoods / pageSize);

    const foods = await this.prisma.food.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        [sortField]: sortOrder,
      },
      include: {
        images: true,
      },
    });

    const categoryId = foods.map((food) => food.categoryId);

    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: categoryId,
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

  async foodsMobile(): Promise<Food[]> {
    return await this.prisma.food.findMany({
      include: {
        images: true,
      },
    });
  }

  async createFood(foodDto: CreateFoodDto): Promise<FoodWithCategory> {
    const { name, price, categoryId, image } = foodDto;

    const savedFile = await this.prisma.file.create({
      data: {
        filename: image.filename,
        path: image.path,
      },
    });

    const category = await this.prisma.category.findFirst({
      where: {
        id: Number(categoryId),
      },
    });

    const createdFood = await this.prisma.food.create({
      data: {
        name,
        price,
        categoryId: Number(categoryId),
        images: {
          connect: { id: savedFile.id },
        },
      },
      include: {
        images: true,
      },
    });

    return { ...createdFood, category };
  }

  async deleteFood(userIds: number[]): Promise<number[]> {
    const deletedFoodsIdsArray: number[] = [];

    for (const userId of userIds) {
      const food = await this.prisma.food.findUnique({
        where: { id: userId },
      });

      if (food) {
        const updatedFood = await this.prisma.food.update({
          where: { id: userId },
          data: { isDeleted: true },
          select: {
            id: true,
          },
        });
        deletedFoodsIdsArray.push(updatedFood.id);
      }
    }

    return deletedFoodsIdsArray;
  }

  async filterFoodByCategory(params: { categoryId: number }): Promise<Food[]> {
    const { categoryId } = params;
    return this.prisma.food.findMany({
      where: {
        categoryId,
      },
      include: {
        images: true,
      },
    });
  }

  async filterFoodByTitle(params: { title: string }): Promise<Food[]> {
    const { title } = params;
    return this.prisma.food.findMany({
      where: {
        name: {
          contains: title,
          mode: 'insensitive',
        },
      },
      include: {
        images: true,
      },
    });
  }

  async filterFoodByTitleAndByCategory(params: {
    title: string;
    categoryId: number;
  }): Promise<Food[]> {
    const { title, categoryId } = params;

    if (title && categoryId) {
      return this.prisma.food.findMany({
        where: {
          name: {
            contains: title,
            mode: 'insensitive',
          },
          categoryId,
        },
        include: {
          images: true,
        },
      });
    }

    if (title) {
      return this.prisma.food.findMany({
        where: {
          name: {
            contains: title,
            mode: 'insensitive',
          },
        },
        include: {
          images: true,
        },
      });
    }

    if (categoryId) {
      return this.prisma.food.findMany({
        where: {
          categoryId,
        },
        include: {
          images: true,
        },
      });
    }

    return [];
  }
}
