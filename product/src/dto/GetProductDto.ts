import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export default class GetProductDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
