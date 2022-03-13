import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Product {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @Column()
  serialNumber: number;

  @Column({
    type: "numeric",
    precision: 9,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({ default: 0 })
  amount: number;

  constructor(
    id: string,
    name: string,
    serialNumber: number,
    price: number,
    amount: number
  ) {
    this.id = id;
    this.name = name;
    this.serialNumber = serialNumber;
    this.price = price;
    this.amount = amount;
  }
}
