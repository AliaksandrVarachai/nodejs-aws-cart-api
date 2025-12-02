import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartStatuses } from '../models';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid', { name: 'cart_id' })
  cartId: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cartId, {
    cascade: true,
    // eager: true,
  })
  items: CartItem[];

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    nullable: false,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
