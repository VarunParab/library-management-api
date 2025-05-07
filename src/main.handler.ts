import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import createServer from '@vendia/serverless-express'; // ✅ correct default import
import { Handler } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrap(): Promise<Handler> {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API for managing books with CRUD and fuzzy search functionality')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document); // Swagger UI at root "/"

  await app.init();

  return createServer({ app: expressApp }); // ✅ correctly using createServer
}

const handler: Handler = async (...args) => {
  cachedServer = cachedServer ?? (await bootstrap());
  return cachedServer(...args);
};

export default handler;
