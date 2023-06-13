import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto {
  @ApiProperty({ example: 'Лосось', description: 'Food name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '300', description: 'Food price' })
  readonly price: string;

  @ApiProperty({ example: 'http:/', description: 'Food image  link' })
  @IsString()
  readonly image: string;

  @ApiProperty({ example: 1, description: 'Category id from db' })
  @IsNumber()
  readonly categoryId: number;
}
