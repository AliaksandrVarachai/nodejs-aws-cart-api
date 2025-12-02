import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  UseGuards,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { BasicAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';
import { Cart } from './entities/cart.entity';
import { DeleteResult } from 'typeorm';
import { DeleteCartItemPayload, PutCartPayload } from '../order/type';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  async getOrCreateCart(@Req() req: AppRequest): Promise<Cart> {
    const userId = getUserIdFromRequest(req);
    return this.cartService.getOrCreateCart(userId);
  }

  @UseGuards(BasicAuthGuard)
  @Delete()
  async deleteCart(@Req() req: AppRequest): Promise<DeleteResult> {
    const userId = getUserIdFromRequest(req);
    return this.cartService.deleteCart(userId);
  }

  @UseGuards(BasicAuthGuard)
  @Put('item')
  async addOrUpdateCartItem(
    @Req() req: AppRequest,
    @Body() body: PutCartPayload,
  ): Promise<Cart> {
    const userId = getUserIdFromRequest(req);
    const { productId, count } = body;
    if (!productId || !count) {
      throw Error('Body must contain productId and count');
    }
    return this.cartService.addOrUpdateCartItem(userId, productId, count)
  }

  @UseGuards(BasicAuthGuard)
  @Delete('item')
  async deleteCartItem(
    @Req() req: AppRequest,
    @Body() body: DeleteCartItemPayload,
  ): Promise<Cart> {
    const userId = getUserIdFromRequest(req);
    const { productId } = req.body;
    if (!productId) {
      throw Error('Body must contain productId');
    }
    return this.cartService.deleteCartItem(userId, productId);
  }
}
