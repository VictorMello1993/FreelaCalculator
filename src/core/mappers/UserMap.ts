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
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
    ValueHour,
    CreatedAt,
    UpdatedAt,
  }: User) {
    return {
      id,
      name,
      email,
      BirthDate,
      MonthlyBudget,
      ZipCode,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour,
      CreatedAt,
      UpdatedAt,
    };
  }
}
