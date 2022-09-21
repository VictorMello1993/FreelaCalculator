import { IsMongoId, IsNotEmpty } from "class-validator";

export namespace GetUserByIdRequestDTO {
  export class Params {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
  }
}
