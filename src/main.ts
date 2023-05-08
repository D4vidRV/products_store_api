import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logguer = new Logger('bootstrap');

  // Prefix /api....
  app.setGlobalPrefix('api');

  // Validations in input data request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT);
  logguer.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
