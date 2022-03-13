import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export default class AddProductDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  constructor(productId: number, amount: number) {
    this.productId = productId;
    this.amount = amount;
  }
}
