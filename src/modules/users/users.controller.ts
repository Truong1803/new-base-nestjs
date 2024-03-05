import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ForgetPasswordDto, LoginDto, SendOTPDto, VerifyOTPDto } from './dto';
import { UsersService } from './users.services';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'API Login' })
  @ApiBody({
    type: LoginDto,
    required: true,
    description: 'Login user',
  })
  @Post('/login')
  @HttpCode(200)
  async login(@Body() payload: LoginDto) {
    return this.usersService.login(payload);
  }

  @ApiOperation({ summary: 'API send OTP' })
  @ApiBody({
    type: SendOTPDto,
    required: true,
    description: 'Send OTP',
  })
  @Post('/send-otp')
  @HttpCode(200)
  async sendOtp(@Body() payload: SendOTPDto) {
    const { email, hash } = payload;
    const result = await this.usersService.sendOTP(email, hash);
    return {
      hash: result,
    };
  }

  @ApiOperation({ summary: 'API verify OTP' })
  @ApiBody({
    type: VerifyOTPDto,
    required: true,
    description: 'Verify OTP',
  })
  @Post('/verify-otp')
  @HttpCode(200)
  async verifyOtp(@Body() payload: VerifyOTPDto) {
    const { otp, hash } = payload;
    const result = await this.usersService.verifyOTP(otp, hash);
    return {
      hash: result,
    };
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'API reset your password' })
  @ApiBody({
    type: ForgetPasswordDto,
    required: true,
    description: 'Forget password',
  })
  @Post('/forget-password')
  @HttpCode(200)
  async forgetPassword(@Body() payload: ForgetPasswordDto) {
    const { newPassword, hash } = payload;
    const result = await this.usersService.forgetPassword(newPassword, hash);
    return {
      status: result,
    };
  }
}
