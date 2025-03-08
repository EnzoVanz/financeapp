import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe());
  
  // Enable CORS for frontend
  app.enableCors();
  
  // Use port 3001 to avoid conflict with Next.js
  await app.listen(3001);
}
bootstrap();
