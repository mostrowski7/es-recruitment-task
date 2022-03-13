import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export default class CreateProductDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  serialNumber: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  constructor(
    name: string,
    serialNumber: number,
    price: number,
    amount: number
  ) {
    this.name = name;
    this.serialNumber = serialNumber;
    this.price = price;
    this.amount = amount;
  }
}
