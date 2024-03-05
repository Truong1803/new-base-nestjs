import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('health-check')
export class AppController {
  @Get()
  @HttpCode(200)
  healthCheck(): string {
    return 'OK';
  }
}
