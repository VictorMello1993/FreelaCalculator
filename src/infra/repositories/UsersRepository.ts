import { injectable } from "inversify";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { UpdateUserInputModel } from "../../core/dtos/users/UpdateUserInputModel";
import { User } from "../../core/entities/User";
import { IUsersRepository } from "../../core/repositories/IUsersRepository";
import { users } from "../database/db";

@injectable()
export class UsersRepository implements IUsersRepository {
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
  }: CreateUserInputModel.Body): User {
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

  findByEmail(email: string): User {
    return users.find((user) => user.email === email);
  }

  findById(id: string): User {
    return users.find((user) => user.id === id);
  }

  update(
    { name, email, MonthlyBudget, VacationPerYear, DaysPerWeek, HoursPerDay, ValueHour }: UpdateUserInputModel.Body,
    { id }: UpdateUserInputModel.Params,
  ): User {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index].name = name;
      users[index].email = email;
      users[index].MonthlyBudget = MonthlyBudget;
      users[index].VacationPerYear = VacationPerYear;
      users[index].DaysPerWeek = DaysPerWeek;
      users[index].HoursPerDay = HoursPerDay;
      users[index].ValueHour = ValueHour;

      return users[index];
    }

    return null;
  }

  inactivateUser(id: string): void {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users[index].active = false;
    }

    console.log(users);
  }
}
