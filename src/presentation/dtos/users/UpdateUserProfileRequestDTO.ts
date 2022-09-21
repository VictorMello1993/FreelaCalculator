import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, Length, Matches, MaxLength } from "class-validator";
export namespace UpdateUserProfileRequestDTO {
  export class Body {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    @Matches(/^[0-9]+/, { message: "ZipCode must be only number" })
    ZipCode: string;

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

  export class Params {
    @IsUUID("4")
    id: string;
  }
}
