import {
  Body,
  Controller,
  Get,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from '@prisma/client';
import { CreateSettingsDto } from './dto/create-settings-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../food/multer.config';
import { UpdateSettings } from './interfaces';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('')
  async getSettings(): Promise<Settings> {
    return this.settingsService.settings();
  }

  @Patch('')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createFood(
    @UploadedFile()
    image: Express.Multer.File,
    @Body() createSettingsDto: CreateSettingsDto,
  ) {
    const settingsDto = { ...createSettingsDto, image } as UpdateSettings;
    return await this.settingsService.updateSettings(settingsDto);
  }
}
