import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../typeorm.config';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

/**
 * Environment variables are loaded by typeorm.config.ts
 */

const typeOrmModule = TypeOrmModule.forRoot(dataSourceConfig);

console.log(`Started with NODE_ENV=${process.env.NODE_ENV} DB_NAME=${process.env.DB_NAME}`);

@Module({
  imports: [AuthModule, CartModule, OrderModule, typeOrmModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
