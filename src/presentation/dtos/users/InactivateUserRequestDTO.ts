import { IsNotEmpty, IsString } from "class-validator";

export namespace InactivateUserRequestDTO {
  export class Params {
    @IsString()
    @IsNotEmpty()
    id: string;
  }
}
