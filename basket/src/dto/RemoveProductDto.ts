import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export default class RemoveProductDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  amount: number;

  constructor(productId: number, amount: number) {
    this.productId = productId;
    this.amount = amount;
  }
}
