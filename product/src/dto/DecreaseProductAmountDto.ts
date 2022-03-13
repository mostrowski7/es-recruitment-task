import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, Min, ValidateNested } from "class-validator";

export class ProductInfo {
  @IsNumber()
  @Min(0)
  id: number;

  @IsInt()
  @Min(0)
  amount: number;

  constructor(id: number, amount: number) {
    this.id = id;
    this.amount = amount;
  }
}

export default class DecreaseProductAmountDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductInfo)
  products: ProductInfo[];

  constructor(products: ProductInfo[]) {
    this.products = products;
  }
}
