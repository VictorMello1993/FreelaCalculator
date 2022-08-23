import { injectable } from "inversify";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
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
  }: CreateUserInputModel): User {
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
}
