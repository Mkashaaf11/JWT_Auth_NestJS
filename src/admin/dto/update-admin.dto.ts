// update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { AdminInfoDto } from './adminInfo.dto';

export class UpdateAdminDto extends PartialType(AdminInfoDto) {}
