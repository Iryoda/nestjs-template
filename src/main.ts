import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const createSwaggerDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Nest Template')
    .setDescription('An template to initiate projects made by Augusto Iryoda')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  createSwaggerDocument(app);

  await app.listen(process.env.PORT || 3333);
}

bootstrap();
