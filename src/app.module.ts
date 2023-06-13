import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';

@Module({
  providers: [PrismaService],
  imports: [CategoryModule, FoodModule, OrderModule],
  controllers: [AppController],
})
export class AppModule {}
