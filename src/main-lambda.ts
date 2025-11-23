import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
// import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import * as serverless from 'serverless-http';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  // const configService = app.get(ConfigService);
  app.use(helmet());
  app.enableCors();
  await app.init();
  return serverless(expressApp);
}

let server: any;

export async function handler(event: any, context: any) {
  console.log('************ event=', event)
  if (!server) {
    server = await bootstrap();
  }
  const result = server(event, context);
  console.log('************ result=', result)
  return result;
};
