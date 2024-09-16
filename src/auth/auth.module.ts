import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UserJWTStrategy } from './strategies/user-jwt.strategy';
import { AdminJWTStrategy } from './strategies/admin-jwt.strategy';

@Module({
  imports: [UserModule, AdminModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserJWTStrategy, AdminJWTStrategy],
})
export class AuthModule {}
