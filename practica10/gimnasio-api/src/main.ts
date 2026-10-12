import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { FiltroErroresDominio } from './comun/filtro-errores-dominio';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new FiltroErroresDominio());

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:5173'],
    exposedHeaders: ['Location', 'X-Request-Id'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();