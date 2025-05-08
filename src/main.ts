// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API for managing books with CRUD and fuzzy search')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve raw Swagger JSON at /swagger-json
  app.use('/swagger-json', (req, res) => res.send(document));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
