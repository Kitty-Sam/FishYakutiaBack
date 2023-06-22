import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const tokenFromCookie =
            request.headers.cookie &&
            request.headers.cookie.replace(/auth-cookie=\s?/, '');
          if (!tokenFromCookie) {
            return null;
          }
          return tokenFromCookie;
        },
      ]),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const { email } = payload;
    const user = await this.authService.findByPayload(email);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.iat);
  }
}
