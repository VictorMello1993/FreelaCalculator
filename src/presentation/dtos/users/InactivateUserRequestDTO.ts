import { IsNotEmpty, IsUUID } from "class-validator";

export namespace InactivateUserRequestDTO {
  export class Params {
    @IsUUID("4")
    @IsNotEmpty()
    id: string;
  }
}
