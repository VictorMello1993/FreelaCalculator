import { IsNotEmpty, IsUUID } from "class-validator";

export namespace GetUserByIdRequestDTO {
  export class Params {
    @IsUUID("4")
    @IsNotEmpty()
    id: string;
  }
}
