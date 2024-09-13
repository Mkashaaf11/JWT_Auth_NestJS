import { IsString } from '@nestjs/class-validator';

export class AdminInfoDto {
  @IsString()
  email: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
}
