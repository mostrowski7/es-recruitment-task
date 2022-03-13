import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  basketId: string;

  @Column({ type: "uuid" })
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  constructor(
    id: string,
    basketId: string,
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    city: string,
    postalCode: string,
    street: string
  ) {
    this.id = id;
    this.basketId = basketId;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.postalCode = postalCode;
    this.street = street;
  }
}
