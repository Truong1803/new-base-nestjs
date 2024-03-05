import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { multerOptions } from './options/multer.option';
import { UploadService } from './uploads.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @ApiOperation({ summary: 'API Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
    description: 'Upload file',
  })
  // @ApiBearerAuth()
  @Post('/multer')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', multerOptions.multerSaver))
  async multerUpload(@UploadedFile() file) {
    return this.uploadService.multerUpload(file);
  }

  @ApiOperation({ summary: 'API Upload file to S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
    description: 'Upload file to S3',
  })
  @ApiBearerAuth()
  @Post('/amazon')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', multerOptions.imageFilter))
  async amazonUpload(@UploadedFile() file) {
    return await this.uploadService.amazonUpload(file);
  }
}
