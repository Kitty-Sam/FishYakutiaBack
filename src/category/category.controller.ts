import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/categories')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Post('/add-category')
  async createFood(@Body() categoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(categoryDto);
  }

  @Delete('category/:id')
  async deleteCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory({ id: Number(id) });
  }

  @Put('category/:id')
  async updateCategoryTitle(
    @Param('id') id: string,
    @Body() updateCategory: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategoryTitle({
      where: { id: Number(id) },
      data: updateCategory,
    });
  }
}
