import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'Olga', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @ApiProperty({ example: '+37529 225215', description: 'User phone' })
  @IsNotEmpty()
  @IsString()
  readonly userPhone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Minsk, Tyrova 3', description: 'User address' })
  readonly userAddress: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '600 RUB', description: 'Total price' })
  readonly totalAmount: string;

  @IsNotEmpty()
  readonly orderItems: OrderItemDto[];
}

export class OrderItemDto {
  @ApiProperty({ example: 1, description: 'Food id' })
  @IsNotEmpty()
  @IsNumber()
  readonly foodId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 5, description: 'Food count' })
  readonly foodCount: number;
}
