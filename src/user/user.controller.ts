import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';
import { UserAuthGuard } from 'src/auth/Guards/user.guard';

@Controller('user')
@UseGuards(UserAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async viewProfile(@Param('id') id: string): Promise<User> {
    const profile = await this.userService.viewUser(+id);
    return profile;
  }

  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userService.updateUser(+id, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  async deleteProfile(@Param('id') id: string): Promise<DeleteResult> {
    const deleteResult = await this.userService.deleteUser(+id);
    return deleteResult;
  }
}
