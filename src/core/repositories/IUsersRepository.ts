import { CreateUserInputModel } from "../dtos/users/CreateUserInputModel";
import { User } from "../entities/User";

export interface IUsersRepository {
  create({
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
  }: CreateUserInputModel): User;
  findByEmail(email: string): User;
}
