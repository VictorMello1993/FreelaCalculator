import { IsNotEmpty, IsUUID } from "class-validator";

export namespace InactivateUserInputModel {
  export class Params {
    @IsUUID("4")
    @IsNotEmpty()
    id: string;
  }
}
