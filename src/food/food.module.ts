import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FoodService } from './food.service';
import { PrismaService } from '../prisma.service';
import { FoodController } from './food.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FoodController],
  providers: [FoodService, PrismaService],
})
export class FoodModule {}
