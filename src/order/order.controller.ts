import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order-dto';

@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/order')
  async createOrder(@Body() orderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @Get('/orders')
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
}
