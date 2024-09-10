import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
