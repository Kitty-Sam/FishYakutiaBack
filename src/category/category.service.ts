import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category-dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: categoryDto,
    });
  }

  async deleteCategory(params: { id: number }): Promise<Category> {
    return this.prisma.category.delete({
      where: {
        id: params.id,
      },
    });
  }

  async updateCategoryTitle(params: {
    where: { id: number };
    data: { title: string };
  }): Promise<Category> {
    const { where, data } = params;
    return this.prisma.category.update({
      data,
      where,
    });
  }
}
