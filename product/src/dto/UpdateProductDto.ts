import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export default class UpdateProductDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  id: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  serialNumber: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  amount: number;

  constructor(
    id: number,
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
