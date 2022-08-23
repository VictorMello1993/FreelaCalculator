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
  ValueHour: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.CreatedAt) {
      this.CreatedAt = new Date();
    }
  }
}
