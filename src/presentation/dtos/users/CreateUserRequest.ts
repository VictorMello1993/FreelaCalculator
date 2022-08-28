import { IsEmail, IsISO8601, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";

export namespace CreateUserRequest {
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

  export class Params {
    @IsUUID()
    @IsNotEmpty()
    id: string;
  }
}
