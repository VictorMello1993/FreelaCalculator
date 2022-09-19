import { IsNotEmpty, IsString } from "class-validator";

export namespace GetUserByIdRequestDTO {
  export class Params {
    @IsString()
    @IsNotEmpty()
    id: string;
  }
}
