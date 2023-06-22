import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Settings } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async updateBadge(params: { data: { text: string } }): Promise<Settings> {
    const { data } = params;
    return this.prisma.settings.update({
      where: { id: 1 },
      data: { badge: data.text },
    });
  }

  async updateDescription(params: {
    data: { text: string };
  }): Promise<Settings> {
    const { data } = params;
    return this.prisma.settings.update({
      where: { id: 1 },
      data: { description: data.text },
    });
  }

  async updateDelivery(params: { data: { text: string } }): Promise<Settings> {
    const { data } = params;
    return this.prisma.settings.update({
      where: { id: 1 },
      data: { delivery: data.text },
    });
  }

  async updateEmail(params: { data: { text: string } }): Promise<Settings> {
    const { data } = params;
    return this.prisma.settings.update({
      where: { id: 1 },
      data: { email: data.text },
    });
  }
}
