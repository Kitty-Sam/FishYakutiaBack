import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly price: string;

  readonly image: Express.Multer.File;

  @IsNotEmpty()
  readonly categoryId: number;
}
