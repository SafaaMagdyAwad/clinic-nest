import { NestFactory } from '@nestjs/core';
import { AppModule } from './dist/app.module'; // use dist if TypeScript compiled
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
}
bootstrap();

export const handler = serverless(expressApp);
