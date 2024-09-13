import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AdminService } from 'src/admin/admin.service';
import { JWTPayload } from '../interface/jwt-payload.interface'; 

@Injectable()
export class AdminJWTStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private configService: ConfigService,
    private adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('ADMIN_SECRET_KEY'), 
    });
  }

  async validate(payload: JWTPayload) {
    const admin = await this.adminService.findByUsername(payload.username); 
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }
}
