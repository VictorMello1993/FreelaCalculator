import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";

export namespace UpdateUserInputModel {
  export class Params {
    @IsUUID("4")
    id: string;
  }

  export class Body {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    MonthlyBudget: number;

    @IsNumber()
    @IsNotEmpty()
    VacationPerYear: number;

    @IsNumber()
    @IsNotEmpty()
    DaysPerWeek: number;

    @IsNumber()
    @IsNotEmpty()
    HoursPerDay: number;

    ValueHour?: number;
  }
}
