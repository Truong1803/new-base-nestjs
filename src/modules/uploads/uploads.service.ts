import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { BASE_URL } from 'src/constants';
import { ICommonUploadFile } from 'src/interfaces';

import { amazonS3Options } from './options/amazon-s3.option';

@Injectable()
export class UploadService {
  private S3: AWS.S3;
  private BUCKET: string;

  constructor() {
    this.S3 = amazonS3Options.S3;
    this.BUCKET = amazonS3Options.bucket;
  }

  multerUpload(file: Express.Multer.File): ICommonUploadFile {
    return {
      title: file.originalname,
      url: BASE_URL + file.path,
    };
  }
  async amazonUpload(file: Express.Multer.File): Promise<ICommonUploadFile> {
    const blobName = `${new Date().getTime()}-${file.originalname}`;
    const params = {
      ContentType: 'image/jpeg',
      Bucket: this.BUCKET,
      Key: blobName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentDisposition: `filename=${blobName}`,
    };
    const uploadedBlob: AWS.S3.ManagedUpload.SendData = await this.S3.upload(params).promise();
    return {
      title: file.originalname,
      url: uploadedBlob?.Location || '',
    };
  }
}
