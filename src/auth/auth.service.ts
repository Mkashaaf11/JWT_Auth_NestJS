import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AdminService } from 'src/admin/admin.service';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto/createUser.dto';
import { User } from 'src/user/user.entity';
import { Admin } from 'src/admin/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly jwtservice: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User with username doesnt exist');
    }
    const isCorrect: Boolean = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new BadRequestException('Password is incorrect');
    }
    return user;
  }

  async validateAdmin(username: string, password: string): Promise<Admin> {
    const admin: Admin = await this.adminService.findByUsername(username);
    if (!admin) {
      throw new NotFoundException('User with username doesnt exist');
    }
    const isCorrect: Boolean = await bcrypt.compare(password, admin.password);
    if (!isCorrect) {
      throw new BadRequestException('Password is incorrect');
    }
    return admin;
  }

  async adminLogin(loginDto: loginDto): Promise<{ acessToken: string }> {
    const admin = await this.validateAdmin(
      loginDto.username,
      loginDto.password,
    );
    const payload = { username: admin.name, sub: admin.id };
    const acessToken = this.jwtservice.sign(payload, {
      secret: process.env.ADMIN_SECRET_KEY,
    });
    return { acessToken };
  }

  async userLogin(loginDto: loginDto): Promise<{ acessToken: string }> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const payload = { username: user.username, sub: user.id };
    const acessToken = this.jwtservice.sign(payload, {
      secret: process.env.USER_SECRET_KEY,
    });
    return { acessToken };
  }

  async registerUser(createUserDto: createUserDto): Promise<void> {
    const hashedPassowrd = await bcrypt.hash(createUserDto.password, 10);
    await this.userService.registerUser({
      ...createUserDto,
      password: hashedPassowrd,
    });
  }

  async registerAdmin(createUserDto: createUserDto): Promise<void> {
    const hashedPassowrd = await bcrypt.hash(createUserDto.password, 10);
    await this.adminService.registerAdmin({
      ...createUserDto,
      password: hashedPassowrd,
    });
  }
}
