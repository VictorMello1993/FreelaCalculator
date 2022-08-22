import { injectable } from "inversify";
import { users } from "../../../../infra/database/db";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { CreateUserInterface } from "./CreateUserInterface";
import { v4 as uuid } from "uuid";

@injectable()
export class CreateUserUseCase implements CreateUserInterface {
  execute(data: CreateUserInputModel) {
    const user = users.find((user) => user.email === data.email);

    if (user) {
      throw new Error("User already exists");
    }

    const newUser = Object.assign({
      id: uuid(),
      name: data.name,
      email: data.email,
      password: data.password,
      BirthDate: data.BirthDate,
      CreatedAt: new Date(),
      UpdatedAt: null,
      MonthlyBudget: data.MonthlyBudget,
      ZipCode: data.ZipCode,
      VacationPerYear: data.VacationPerYear,
      ValueHour: data.ValueHour,
      DaysPerWeek: data.DaysPerWeek,
      HoursPerDay: data.HoursPerDay,
    });

    users.push(newUser);

    return newUser;
  }
}
