import { v4 as uuid } from "uuid";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  BirthDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
  MonthlyBudget: number;
  ZipCode: string;
  VacationPerYear: number;
  DaysPerWeek: number;
  HoursPerDay: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
