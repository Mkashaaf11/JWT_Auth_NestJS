import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findByUsername(username: string): Promise<User> {
    const isUser = await this.userRepository.findOneBy({ username });
    return isUser;
  }

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if the username already exists
    const existingUser = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    // Create and save the new user
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async viewUser(id: number): Promise<User> {
    const userProfile = await this.userRepository.findOneBy({ id });
    return userProfile;
  }

  async updateUser(id: number, updatedUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    Object.assign(user, updatedUser);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return await this.userRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
