import { CreateUserInputModel } from "./../dtos/users/CreateUserInputModel";
import { User } from "../entities/User";
import { UpdateUserInputModel } from "../dtos/users/UpdateUserInputModel";
import { Job } from "../entities/Job";

export interface IUsersRepository {
  create({
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
    active,
  }: CreateUserInputModel): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;

  update({
    id,
    name,
    email,
    MonthlyBudget,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
    ValueHour,
  }: UpdateUserInputModel): Promise<User>;

  inactivateUser(id: string): Promise<void>;

  addJobItem(id: string, job: Job): Promise<void>;

  deleteJobItem(id: string): Promise<void>;
}
