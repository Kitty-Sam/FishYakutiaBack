import { CreateSettingsDto } from '../dto/create-settings-dto';

export interface UpdateSettings extends CreateSettingsDto {
  id: string;
}
