import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetListUserDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'First name',
    example: 'Johan',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Last name',
    example: 'Pham',
  })
  lastName: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    description: 'Set status active or inactive',
    example: true,
  })
  isActive: boolean;
}

export class UpdateStatusDto {
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'User status',
    example: true,
  })
  status: boolean;
}

export class IdParamsDto {
  @IsNumberString()
  id: number;
}
