import { IsMongoId, IsNotEmpty } from "class-validator";

export namespace DeleteJobRequestDTO {
  export class Params {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
  }
}
