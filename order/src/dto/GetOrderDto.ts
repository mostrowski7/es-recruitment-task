import { IsOptional, IsUUID } from "class-validator";

export default class GetOrderDto {
  @IsUUID()
  @IsOptional()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
