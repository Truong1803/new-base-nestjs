import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendOTPDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Your email',
    example: 'youremail@email.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Your hash',
    example: 'string',
  })
  hash: string;
}

export class VerifyOTPDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The OTP you received',
    example: '8888',
  })
  otp: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Your hash',
    example: 'string',
  })
  hash: string;
}

export class ForgetPasswordDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Your new password',
    example: 'newpassword',
  })
  newPassword: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Your hash',
    example: 'string',
  })
  hash: string;
}
