import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly userPhone: string;

  @IsNotEmpty()
  @IsString()
  readonly userAddress: string;

  @IsNotEmpty()
  @IsString()
  readonly paymentMethod: string;

  @IsString()
  readonly comment: string;

  @IsNotEmpty()
  @IsString()
  readonly totalAmount: string;

  @IsNotEmpty()
  readonly orderItems: OrderItemDto[];
}

export class OrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  readonly foodId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly foodCount: number;
}
