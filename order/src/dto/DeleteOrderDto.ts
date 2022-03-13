import { IsNotEmpty, IsUUID } from "class-validator";

export default class RemoveProductDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
