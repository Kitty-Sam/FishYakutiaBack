import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Food } from '@prisma/client';

@Controller('')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/categories')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
