import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.prisma.order.findMany({
      include: {
        foods: {
          include: {
            food: true,
          },
        },
      },
    });
  }

  async createOrder(orderDto: CreateOrderDto): Promise<Order> {
    const {
      userPhone,
      userAddress,
      userName,
      orderItems,
      totalAmount,
      paymentMethod,
      comment,
    } = orderDto;

    const order: Prisma.OrderCreateInput = {
      userName,
      userPhone,
      userAddress,
      totalAmount,
      paymentMethod,
      comment,
      foods: {
        create: orderItems.map((item) => ({
          food: { connect: { id: item.foodId } },
          foodCount: item.foodCount,
        })),
      },
    };

    return this.prisma.order.create({
      data: order,
    });
  }
}
