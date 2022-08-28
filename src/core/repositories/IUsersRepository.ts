import { CreateUserInputModel } from "./../dtos/users/CreateUserInputModel";
import { User } from "../entities/User";
import { UpdateUserInputModel } from "../dtos/users/UpdateUserInputModel";
import { Job } from "../entities/Job";

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

  findById(id: string): User;

  update({
    id,
    name,
    email,
    MonthlyBudget,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
    ValueHour,
  }: UpdateUserInputModel): User;

  inactivateUser(id: string): void;

  addJobItem(id: string, job: Job): void;

  deleteJobItem(id: string): void;
}
