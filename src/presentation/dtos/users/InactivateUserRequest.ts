import { IsNotEmpty, IsUUID } from "class-validator";

export namespace InactivateUserRequest {
  export class Params {
    @IsUUID("4")
    @IsNotEmpty()
    id: string;
  }
}
