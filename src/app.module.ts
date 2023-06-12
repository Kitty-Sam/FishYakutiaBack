import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { FoodController } from './food/food.controller';
import { FoodModule } from './food/food.module';

@Module({
  providers: [PrismaService],
  imports: [CategoryModule, FoodModule],
  controllers: [FoodController],
})
export class AppModule {}
