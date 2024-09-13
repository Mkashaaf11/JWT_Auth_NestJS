import { Body, Controller, Post } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { createUserDto } from './dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  async userLogin(@Body() loginDto: loginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Post('user/signup')
  async userSignup(@Body() createUserDto: createUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('admin/login')
  async adminLogin(@Body() loginDto: loginDto) {
    return this.authService.adminLogin(loginDto);
  }
}
