import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JWTPayload } from '../interface/jwt-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserJWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configservice: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configservice.get<string>('USER_SECRET_KEY'),
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.userService.findByUsername(payload.username);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }
}
