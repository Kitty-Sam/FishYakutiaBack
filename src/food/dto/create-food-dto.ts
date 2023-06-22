import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly price: string;

  @IsString()
  readonly image: string;

  @IsNumber()
  readonly categoryId: number;
}
