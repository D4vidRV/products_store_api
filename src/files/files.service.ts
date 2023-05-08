import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure the file is an image');
    }

    // Here you can manage the image
    return {
      filename: file.originalname,
    };
  }
}
