import { Body, Controller, Get, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from '@prisma/client';
import { UpdateSettingsDto } from './dto/update-settings-dto';

@Controller('')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('all')
  async getSettings(): Promise<Settings> {
    return this.settingsService.settings();
  }

  @Put('badge')
  async updateBadge(@Body() updateBadge: UpdateSettingsDto): Promise<Settings> {
    return this.settingsService.updateBadge({
      data: updateBadge,
    });
  }

  @Put('description')
  async updateDescription(
    @Body() updateDescription: UpdateSettingsDto,
  ): Promise<Settings> {
    return this.settingsService.updateDescription({
      data: updateDescription,
    });
  }

  @Put('delivery')
  async updateDelivery(
    @Body() updateDelivery: UpdateSettingsDto,
  ): Promise<Settings> {
    return this.settingsService.updateDelivery({
      data: updateDelivery,
    });
  }

  @Put('email')
  async updateEmail(@Body() updateEmail: UpdateSettingsDto): Promise<Settings> {
    return this.settingsService.updateEmail({
      data: updateEmail,
    });
  }
}
