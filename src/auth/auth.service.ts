import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signPayload(email: string) {
    return sign(email, 'secret', { expiresIn: '7d' });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    }

    const isPasswordValid = await compare(password, user.password);
    if (isPasswordValid) {
      return user;
    } else {
      return null;
    }
  }

  async findByPayload(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return false;
    } else {
      return user;
    }
  }
}
