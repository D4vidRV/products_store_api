import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private configService: ConfigService) {}

  bucketName = this.configService.get('AWS_S3_BUCKET_NAME');

  s3 = new S3({
    region: this.configService.get('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.get('S3_ACCESS_ID'),
      secretAccessKey: this.configService.get('S3_SECRET_KEY'),
    },
  });

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure the file is an image');
    }

    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');

    const { buffer, originalname } = file;
    const extension = originalname.split('.').pop();
    const uploadName = `${uuid()}.${extension}`;

    // console.log(this.s3);

    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: bucketName,
          Body: buffer,
          Key: uploadName,
          ACL: 'public-read',
          ContentType: file.mimetype,
          // ContentDisposition: 'inline',
        })
        .promise();

      return {
        secureURL: uploadResult.Location,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
