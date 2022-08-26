import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserInputModel {
  @IsString()
  @IsNotEmpty()
  name: string;

  email: string;
  password: string;
  BirthDate: Date;
  MonthlyBudget: number;
  ZipCode: string;
  VacationPerYear: number;
  DaysPerWeek: number;
  HoursPerDay: number;
  ValueHour: number;
}
