import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn('uuid', { name: 'cart_item_id' })
  cartItemId: string;

  @Column({
    type: 'uuid',
    name: 'cart_id' }
  )
  cartId: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({
    type: 'varchar',
    name: 'product_id'
  })
  productId: string;

  @Column()
  count: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
