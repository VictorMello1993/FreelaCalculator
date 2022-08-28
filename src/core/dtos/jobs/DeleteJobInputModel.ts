import { IsNotEmpty, IsUUID } from "class-validator";

export namespace DeleteJobInputModel {
  export class Params {
    @IsUUID()
    @IsNotEmpty()
    id: string;
  }
}
