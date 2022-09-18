import { AddressModel } from "../../../types/AddressModel";
import { JobViewModel } from "../jobs/JobViewModel";

export class UserViewModel {
  id: string;
  name: string;
  email: string;
  BirthDate?: Date;
  MonthlyBudget: number;
  ZipCode: string;
  Address?: AddressModel;
  VacationPerYear: number;
  DaysPerWeek: number;
  HoursPerDay: number;
  ValueHour: number;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  active: Boolean;
  JobList?: JobViewModel[];
}
