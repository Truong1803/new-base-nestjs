import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'The Email field is required!' })
  @ApiProperty({
    type: String,
    description: 'Your email',
    example: 'example@gmail.com',
  })
  email: string;

  @MaxLength(32, { message: 'The Password field is less than 32 characters.' })
  @MinLength(6, { message: 'The Password field is from 6 characters or more' })
  @IsString()
  @IsNotEmpty({ message: 'This Password field is required' })
  @ApiProperty({
    type: String,
    description: 'Your password',
    example: 'password',
  })
  password: string;
}
