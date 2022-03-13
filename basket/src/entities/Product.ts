import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Basket from "./Basket";

@Entity()
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  productId: number;

  @Column()
  amount: number;

  @ManyToOne(() => Basket, (basket) => basket.products)
  basket: Basket;

  constructor(id: string, productId: number, amount: number, basket: Basket) {
    this.id = id;
    this.productId = productId;
    this.amount = amount;
    this.basket = basket;
  }
}
