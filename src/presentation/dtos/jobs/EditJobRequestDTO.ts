import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";

export namespace EditJobRequestDTO {
  export class Params {
    @IsUUID("4")
    @IsNotEmpty()
    id: string;
  }

  export class Body {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    DailyHours: number;

    @IsNumber()
    @IsNotEmpty()
    TotalHours: number;

    UserId: string;
  }

  export class Request {
    user: any;
  }
}
