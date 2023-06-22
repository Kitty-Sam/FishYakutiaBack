import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CheckUserDto } from './dto/check-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    return req.user.email;
  }

  @Post('login')
  async login(
    @Body() body: CheckUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (user) {
      const token = await this.authService.signPayload(user);
      await res.cookie('auth-cookie', token, { httpOnly: true });
      return user.email;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res() res: Response) {
    await res.cookie('auth-cookie', 'logout', { httpOnly: true });
    return res.json({ message: 'logout' });
  }
}
