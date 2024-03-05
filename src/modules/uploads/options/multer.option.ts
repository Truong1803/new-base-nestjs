import fs from 'fs';
import path, { extname } from 'path';

import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const multerOptions = {
  imageFilter: {
    limits: {
      files: 1,
      fileSize: 50 * 1024 * 1024,
    },
    fileFilter: (req: Request, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
      }
    },
  },
  multerSaver: {
    storage: diskStorage({
      destination: function (req, file, cb) {
        const DIR_NAME = 'uploads';
        if (!fs.existsSync(DIR_NAME)) {
          fs.mkdirSync(DIR_NAME);
        }
        cb(null, DIR_NAME);
      },
      filename: function (req, file, cb) {
        cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
      },
    }),
  },
};
