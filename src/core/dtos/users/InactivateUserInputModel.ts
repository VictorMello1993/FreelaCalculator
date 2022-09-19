import { IsNotEmpty, IsString } from "class-validator";

export namespace InactivateUserInputModel {
  export class Params {
    @IsString()
    @IsNotEmpty()
    id: string;
  }
}
