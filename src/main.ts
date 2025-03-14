import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativando o CORS para permitir requisições de localhost:3001
  app.enableCors({
    origin: 'http://localhost:3001',  // O frontend React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Se necessário
    preflightContinue: false, // Habilita para o NestJS responder à requisição OPTIONS
  });

  // Adiciona suporte ao JSON no NestJS
  app.use(express.json());

  // Validação automática do DTO
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);  // Verifique a porta do NestJS
}
bootstrap();
