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
  active: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.CreatedAt = new Date();
      this.active = true;
    }
  }
}
