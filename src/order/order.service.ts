import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders(): Promise<{ [key: string]: Order[] }[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        foods: {
          include: {
            food: true,
          },
        },
      },
    });

    return orders.reduce((acc, order) => {
      const createdAt = order.createdAt.toISOString().slice(0, 10);
      const existingOrder = acc.find((o) => Object.keys(o)[0] === createdAt);

      if (existingOrder) {
        existingOrder[createdAt].unshift(order);
      } else {
        acc.unshift({ [createdAt]: [order] });
      }

      return acc;
    }, []);
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
