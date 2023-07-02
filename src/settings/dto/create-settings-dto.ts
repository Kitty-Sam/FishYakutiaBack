import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingsDto {
  @IsNotEmpty()
  @IsString()
  readonly delivery: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly image: Express.Multer.File;
}
