import { IsNotEmpty, IsString, MinLength } from "class-validator";

export default class CreateUserDto {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
