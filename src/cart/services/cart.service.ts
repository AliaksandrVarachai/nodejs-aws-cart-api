import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartStatuses } from '../models';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async findOpenedCart(userId: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findOne({
      where: { userId, status: CartStatuses.OPEN },
      // relations: ['items'],
    });
    if (!cart) {
      return null;
    }
    const cartItems = await this.cartItemRepository.find({
      where: { cartId: cart.cartId }
    });
    return {
      ...cart,
      items: cartItems,
    };
  }

  async addCart(userId: string): Promise<Cart> {
    const savedCart = await this.cartRepository.save({
      userId,
      status: CartStatuses.OPEN,
    });
    return {
      ...savedCart,
      items: [],
    }
  }

  async deleteCart(userId: string): Promise<DeleteResult> {
    return this.cartRepository.delete({
      userId,
      status: CartStatuses.OPEN
    });
  }

  async addOrUpdateCartItem(userId: string, productId: string, count: number): Promise<Cart> {
    const cart = await this.findOpenedCart(userId);
    if (!cart) {
      throw Error(`Can't update cart item without status ${CartStatuses.OPEN}`);
    }
    const cartItem = cart.items.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.count = count;
      await this.cartItemRepository.save(cartItem);
    } else {
      await this.cartItemRepository.save({
        cartId: cart.cartId,
        productId,
        count,
      });
    }
    return await this.findOpenedCart(userId);
  }

  async deleteCartItem(userId: string, productId: string): Promise<Cart> {
    const cart = await this.findOpenedCart(userId);
    if (!cart) {
      throw Error(`Can't remove item because cart status is not ${CartStatuses.OPEN}`);
    }
    const cartItem = cart.items.find(item => item.productId === productId);
    if (cartItem) {
      await this.cartItemRepository.remove(cartItem);
    }
    return this.findOpenedCart(userId);
  }

  async getOrCreateCart(userId: string): Promise<Cart> {
    const openedCart = await this.findOpenedCart(userId);
    if (openedCart) {
      return openedCart;
    }
    return await this.addCart(userId);
  }
}
