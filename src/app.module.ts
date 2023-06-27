import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import * as path from 'path';

@Module({
  providers: [PrismaService],
  imports: [
    CategoryModule,
    FoodModule,
    OrderModule,
    AuthModule,
    SettingsModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'uploads'),
      serveStaticOptions: { index: false },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
