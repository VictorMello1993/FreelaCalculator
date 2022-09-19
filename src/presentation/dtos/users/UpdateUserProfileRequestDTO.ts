import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength } from "class-validator";
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

    UpdatedAt?: Date;

    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    @Matches(/^[0-9]+/, { message: "ZipCode must be only number" })
    ZipCode: string;
  }

  export class Params {
    @IsString()
    @IsNotEmpty()
    id: string;
  }
}
