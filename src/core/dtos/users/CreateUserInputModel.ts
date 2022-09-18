export class CreateUserInputModel {
  id?: string;
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
  CreatedAt?: Date;
  UpdatedAt?: Date;
  active?: boolean;
}
