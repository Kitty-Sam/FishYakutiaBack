import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order-dto';

@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create-order')
  async createOrder(@Body() orderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @Get('/orders')
  async getAllOrders(@Query('page', ParseIntPipe) page: number): Promise<{
    orders: {
      [key: string]: Order[];
    }[];
    totalOrders: number;
  }> {
    const { orders, totalOrders } = await this.orderService.getAllOrders(page);
    return {
      orders,
      totalOrders,
    };
  }
}
