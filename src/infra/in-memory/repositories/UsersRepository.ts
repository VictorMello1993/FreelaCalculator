import { injectable } from "inversify";
import { CreateUserInputModel } from "../../../core/dtos/users/CreateUserInputModel";
import { UpdateUserInputModel } from "../../../core/dtos/users/UpdateUserInputModel";
import { Job } from "../../../core/entities/Job";
import { User } from "../../../core/entities/User";
import { IUsersRepository } from "../../../core/repositories/IUsersRepository";

const users: User[] = [];

@injectable()
export class UsersRepository implements IUsersRepository {
  async create({
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
  }: CreateUserInputModel): Promise<User> {
    const newUser = new User();

    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    newUser.BirthDate = BirthDate;
    newUser.MonthlyBudget = MonthlyBudget;
    newUser.ZipCode = ZipCode;
    newUser.VacationPerYear = VacationPerYear;
    newUser.DaysPerWeek = DaysPerWeek;
    newUser.HoursPerDay = HoursPerDay;
    newUser.ValueHour = ValueHour;

    users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return users.find((user) => user.id === id);
  }

  async update({
    id,
    name,
    email,
    MonthlyBudget,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
    ValueHour,
  }: UpdateUserInputModel): Promise<User> {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index].name = name;
      users[index].email = email;
      users[index].MonthlyBudget = MonthlyBudget;
      users[index].VacationPerYear = VacationPerYear;
      users[index].DaysPerWeek = DaysPerWeek;
      users[index].HoursPerDay = HoursPerDay;
      users[index].ValueHour = ValueHour;
      users[index].UpdatedAt = new Date();

      return users[index];
    }

    return null;
  }

  async inactivateUser(id: string): Promise<void> {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index].active = false;
    }
  }

  async addJobItem(id: string, job: Job): Promise<void> {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index].JobList.push(job);
    }
  }

  async deleteJobItem(id: string): Promise<void> {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index].JobList.splice(index, 1);
    }
  }
}
