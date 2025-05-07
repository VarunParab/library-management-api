import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { configure as serverlessExpress } from '@vendia/serverless-express'; // ✅ FIXED

const expressApp = express();

async function createNestServer(expressInstance: express.Express) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API for managing books with CRUD and fuzzy search functionality')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document); // Swagger UI at "/"

  await app.init();
}

createNestServer(expressApp)
  .then(() => console.log('NestJS serverless app ready'))
  .catch(err => console.error('NestJS startup error', err));

export const handler = serverlessExpress({ app: expressApp }); // ✅ FIXED
