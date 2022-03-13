import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: Role.User })
  role: Role;

  constructor(id: string, username: string, password: string, role: Role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
