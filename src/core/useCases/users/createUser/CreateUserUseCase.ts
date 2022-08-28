import { inject, injectable } from "inversify";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { TYPES } from "../../../../types";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";
import { generateHash } from "../../../../utils/auth.helpers";
import { User } from "../../../entities/User";
import { CalculateValueHour } from "../../../services/CalculateValueHour";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    email,
    password,
    BirthDate,
    MonthlyBudget,
    ZipCode,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
  }: CreateUserInputModel.Body): Promise<User> {
    const user = this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError("User already exists");
    }

    const valueHour = CalculateValueHour(VacationPerYear, HoursPerDay, DaysPerWeek, MonthlyBudget);

    const hashedPassword = await generateHash(password);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      BirthDate,
      MonthlyBudget,
      ZipCode,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour: valueHour,
    });

    return newUser;
  }
}
