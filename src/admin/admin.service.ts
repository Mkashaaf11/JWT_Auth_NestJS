import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminInfoDto } from './dto/adminInfo.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  async findByUsername(name: string): Promise<Admin> {
    const isUser = await this.adminRepository.findOneBy({ name });
    return isUser;
  }

  async updateInfo(id: number, updatedAdmin: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin not found!');
    }

    Object.assign(admin, updatedAdmin);
    return await this.adminRepository.save(admin);
  }

  async registerAdmin(createUserDto: AdminInfoDto): Promise<Admin> {
    // Check if the username already exists
    const existingUser = await this.adminRepository.findOneBy({
      name: createUserDto.username,
    });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    // Create and save the new user
    const admin = this.adminRepository.create(createUserDto);
    return this.adminRepository.save(admin);
  }
}
