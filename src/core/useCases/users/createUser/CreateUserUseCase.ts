import { inject, injectable } from "inversify";
import { users } from "../../../../infra/database/db";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { v4 as uuid } from "uuid";
import { TYPES } from "../../../../types";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  execute(data: CreateUserInputModel) {
    const user = this.usersRepository.findByEmail(data.email);

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
