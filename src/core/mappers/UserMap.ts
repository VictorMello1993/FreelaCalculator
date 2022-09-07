import { User } from "../entities/User";

export class UserMap {
  static toDTO({
    id,
    name,
    email,
    password,
    BirthDate,
    MonthlyBudget,
    ZipCode,
    Address,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
    ValueHour,
    CreatedAt,
    UpdatedAt,
    JobList,
  }: User) {
    return {
      id,
      name,
      email,
      BirthDate,
      MonthlyBudget,
      ZipCode,
      Address,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour,
      CreatedAt,
      UpdatedAt,
      JobList,
    };
  }
}
