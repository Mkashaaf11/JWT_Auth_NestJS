import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';
import { AdminAuthGuard } from 'src/auth/Guards/admin.guard';

@Controller('admin')
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}
  //Get/admin/dashboard
  @Get('dashboard')
  dashboard() {
    return 'hello world';
  }

  //Get/admin/users
  @Get('users')
  async viewUsers() {
    const users = await this.userService.findAll();
    return users;
  }
}
