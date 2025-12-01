import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.use(helmet());
  app.enableCors();
  await app.init();
  return serverless(expressApp);
}

let server: any;

export async function handler(event: any, context: any) {
  console.log('Started with event=', event)
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context);
};
