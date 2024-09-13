import { IsString } from '@nestjs/class-validator';

export class loginDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
