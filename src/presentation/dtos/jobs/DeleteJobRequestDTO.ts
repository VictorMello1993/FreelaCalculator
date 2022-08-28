import { IsNotEmpty, IsUUID } from "class-validator";

export namespace DeleteJobRequestDTO {
  export class Params {
    @IsUUID()
    @IsNotEmpty()
    id: string;
  }
}
