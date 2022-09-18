import { v4 as uuid } from "uuid";
import { Job } from "./Job";

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
  JobList: Job[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.CreatedAt = new Date();
      this.active = true;
      this.JobList = [];
    }
  }

  static build(
    id: string,
    name: string,
    email: string,
    password: string,
    BirthDate: Date,
    CreatedAt: Date,
    UpdatedAt: Date,
    MonthlyBudget: number,
    ZipCode: string,
    VacationPerYear: number,
    DaysPerWeek: number,
    HoursPerDay: number,
    ValueHour: number,
    active: boolean,
    JobList?: Job[],
  ): User {
    return {
      id,
      name,
      email,
      password,
      BirthDate,
      CreatedAt,
      UpdatedAt,
      MonthlyBudget,
      ZipCode,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour,
      active,
      JobList,
    };
  }
}
