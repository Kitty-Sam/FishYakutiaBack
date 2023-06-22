import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../prisma.service';
import { User } from '../types';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signPayload(user: User) {
    return sign(user, process.env.SECRET_WORD, { expiresIn: '7d' });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
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
        email,
      },
    });
    if (!user) {
      return false;
    } else {
      return user;
    }
  }
}
