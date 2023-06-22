import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';


@Module({
  providers: [PrismaService],
  imports: [CategoryModule, FoodModule, OrderModule, AuthModule, SettingsModule],
  controllers: [AppController],
  })

export class AppModule {}
