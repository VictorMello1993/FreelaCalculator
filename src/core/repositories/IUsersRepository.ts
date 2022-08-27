import { CreateUserInputModel } from "./../dtos/users/CreateUserInputModel";
import { UpdateUserInputModel } from "../dtos/users/UpdateUserInputModel";
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
  }: CreateUserInputModel.Body): User;

  findByEmail(email: string): User;

  findById(id: string): User;

  update(
    { name, email, MonthlyBudget, VacationPerYear, DaysPerWeek, HoursPerDay, ValueHour }: UpdateUserInputModel.Body,
    { id }: UpdateUserInputModel.Params,
  ): User;

  inactivateUser(id);
}
