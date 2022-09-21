import { IsEmail, IsISO8601, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength } from "class-validator";

export namespace CreateUserRequestDTO {
  export class Body {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsISO8601()
    @IsNotEmpty()
    BirthDate: Date;

    @IsNumber()
    @IsNotEmpty()
    MonthlyBudget: number;

    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    @Matches(/^[0-9]+/, { message: "ZipCode must be only number" })
    ZipCode: string;

    @IsNumber()
    @IsNotEmpty()
    VacationPerYear: number;

    @IsNumber()
    @IsNotEmpty()
    DaysPerWeek: number;

    @IsNumber()
    @IsNotEmpty()
    HoursPerDay: number;
  }
}
