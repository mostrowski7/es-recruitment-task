import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export default class CreateProductDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
