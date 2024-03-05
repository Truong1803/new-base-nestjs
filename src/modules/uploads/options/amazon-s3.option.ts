import AWS from 'aws-sdk';

import { AWS_ACCESS_KEY_ID, AWS_BUCKET, AWS_SECRET_ACCESS_KEY, S3_REGION } from '../../../constants';

export const amazonS3Options = {
  S3: new AWS.S3({
    // Your config options
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: S3_REGION,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  }),
  bucket: AWS_BUCKET,
};
