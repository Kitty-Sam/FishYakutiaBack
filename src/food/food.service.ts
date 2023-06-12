import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  async foods(): Promise<Food[]> {
    return await this.prisma.food.findMany();
  }

  async filterFoodByCategory(params: { categoryId: number }): Promise<Food[]> {
    const { categoryId } = params;
    return this.prisma.food.findMany({
      where: {
        categoryId,
      },
    });
  }
}
