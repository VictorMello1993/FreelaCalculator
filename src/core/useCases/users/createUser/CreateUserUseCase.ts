import { inject, injectable } from "inversify";
import { TYPES } from "../../../../types";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";
import { generateHash } from "../../../../utils/auth.helpers";
import { CalculateValueHour } from "../../../services/CalculateValueHour";
import { UserMap } from "../../../mappers/UserMap";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";

@injectable()
export class CreateUserUseCase {
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
  }: CreateUserInputModel): Promise<UserMap> {
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

    return UserMap.toDTO(newUser);
  }
}
