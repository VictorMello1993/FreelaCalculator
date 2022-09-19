import { inject, injectable } from "inversify";
import { TYPES } from "../../../../types";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";
import { generateHash } from "../../../../utils/auth.helpers";
import { CalculateValueHour } from "../../../services/CalculateValueHour";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { FindAddress } from "../../../services/FindAddress";
// import { v4 as uuid } from "uuid";
import { UserViewModel } from "../../../dtos/users/UserViewModel";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) {
    this._usersRepository = usersRepository;
  }

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
  }: CreateUserInputModel): Promise<UserViewModel> {
    const user = await this._usersRepository.findByEmail(email);

    if (user) {
      throw new AppError("User already exists");
    }

    const valueHour = CalculateValueHour(VacationPerYear, HoursPerDay, DaysPerWeek, MonthlyBudget);
    const hashedPassword = await generateHash(password);
    const address = await FindAddress(ZipCode);

    const newUser = await this._usersRepository.create({
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
      CreatedAt: new Date(),
      UpdatedAt: null,
      active: true,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      BirthDate: newUser.BirthDate,
      MonthlyBudget: newUser.MonthlyBudget,
      ZipCode: newUser.ZipCode,
      Address: address,
      VacationPerYear: newUser.VacationPerYear,
      DaysPerWeek: newUser.DaysPerWeek,
      HoursPerDay: newUser.HoursPerDay,
      ValueHour: valueHour,
      CreatedAt: newUser.CreatedAt,
      active: newUser.active,
    };
  }
}
