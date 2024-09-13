import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';

@Controller('admin')
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
