import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  // ******SWAGGER******
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Shop of products endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // ******SWAGGER******

  await app.listen(process.env.PORT);
  logguer.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
