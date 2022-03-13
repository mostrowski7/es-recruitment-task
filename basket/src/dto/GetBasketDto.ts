import { IsNotEmpty, IsUUID } from "class-validator";

export default class GetBasketDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
