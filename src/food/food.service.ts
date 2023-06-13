import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateFoodDto } from './dto/create-food-dto';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  async foods(): Promise<Food[]> {
    return await this.prisma.food.findMany();
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
