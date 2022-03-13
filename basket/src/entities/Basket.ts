import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Product from "./Product";

@Entity()
export default class Basket {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  userId: string;

  @OneToMany(() => Product, (products) => products.basket)
  products: Product[];

  constructor(id: string, userId: string, products: Product[]) {
    this.id = id;
    this.userId = userId;
    this.products = products;
  }
}
