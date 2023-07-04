import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Settings } from '@prisma/client';
import { UpdateSettings } from './interfaces';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async settings(): Promise<Settings> {
    return await this.prisma.settings.findFirst({
      include: {
        image: true,
      },
    });
  }

  async updateSettings(settingDto: UpdateSettings): Promise<Settings> {
    const { image, email, delivery, description, id } = settingDto;

    const savedFile = await this.prisma.file.create({
      data: {
        filename: image.filename,
        path: image.path,
      },
    });

    return await this.prisma.settings.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        delivery,
        description,
        image: {
          connect: { id: savedFile.id },
        },
      },
      include: {
        image: true,
      },
    });
  }
}
