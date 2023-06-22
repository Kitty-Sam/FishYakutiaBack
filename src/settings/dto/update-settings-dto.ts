import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
