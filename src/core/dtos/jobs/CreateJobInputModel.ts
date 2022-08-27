import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export namespace CreateJobInputModel {
  export class Body {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    DailyHours: number;

    @IsNumber()
    @IsNotEmpty()
    TotalHours: number;
  }
}
