export class CreateUserInputModel {
  name: string;
  email: string;
  password: string;
  BirthDate: Date;
  MonthlyBudget: number;
  ZipCode: string;
  Address?: any;
  VacationPerYear: number;
  DaysPerWeek: number;
  HoursPerDay: number;
  ValueHour?: number;
}
