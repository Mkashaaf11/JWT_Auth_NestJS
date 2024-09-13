import { IsString } from '@nestjs/class-validator';

export class createUserDto {
  @IsString()
  email: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
}
