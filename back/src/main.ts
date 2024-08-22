import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as process from 'process';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  app.enableCors({
    origin: [
      process.env.CLIENT_URL,
      'http://127.0.0.1:5173',
      'https://fishka-admin.netlify.app',
    ],
    credentials: true,
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
