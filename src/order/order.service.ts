import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders(page: number): Promise<{
    orders: {
      [key: string]: Order[];
    }[];
    totalOrders: number;
  }> {
    const pageSize = 50;
    const skip = (page - 1) * pageSize;
    const orders = await this.prisma.order.findMany({
      skip: skip,
      take: pageSize,
      include: {
        foods: {
          include: {
            food: true,
          },
        },
      },
    });

    const totalOrders = await this.prisma.order.count();
    const totalOrdersPages = Math.ceil(totalOrders / pageSize);

    const groupedOrders = orders.reduce((acc, order) => {
      const createdAt = order.createdAt.toISOString().slice(0, 10);
      const existingOrder = acc.find((o) => Object.keys(o)[0] === createdAt);

      if (existingOrder) {
        existingOrder[createdAt].unshift(order);
      } else {
        acc.unshift({ [createdAt]: [order] });
      }

      return acc;
    }, []);

    return {
      orders: groupedOrders,
      totalOrders: totalOrdersPages,
    };
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
