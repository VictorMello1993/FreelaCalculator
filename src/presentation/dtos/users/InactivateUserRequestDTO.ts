import { IsMongoId, IsNotEmpty } from "class-validator";

export namespace InactivateUserRequestDTO {
  export class Params {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
  }
}
