// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API for managing books with CRUD and fuzzy search')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Save Swagger JSON to local file (move it manually to /public for Vercel)
  writeFileSync(join(__dirname, '..', 'swagger.json'), JSON.stringify(document, null, 2));

  // Optional: If running locally, you can still use Swagger UI via `/docs`
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
