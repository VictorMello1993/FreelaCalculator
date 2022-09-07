import { inject, injectable } from "inversify";
import { TYPES } from "../../../../types";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";
import { generateHash } from "../../../../utils/auth.helpers";
import { CalculateValueHour } from "../../../services/CalculateValueHour";
import { UserMap } from "../../../mappers/UserMap";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { FindAddress } from "../../../services/FindAddress";

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
  }: CreateUserInputModel): Promise<UserMap> {
    const user = this._usersRepository.findByEmail(email);

    if (user) {
      throw new AppError("User already exists");
    }

    const valueHour = CalculateValueHour(VacationPerYear, HoursPerDay, DaysPerWeek, MonthlyBudget);
    const hashedPassword = await generateHash(password);
    const address = await FindAddress(ZipCode);

    if (address.erro) {
      throw new AppError("Couldn't find full address with this ZipCode. Please, check if it is correct");
    }

    const newUser = this._usersRepository.create({
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
      Address: address,
    });

    return UserMap.toDTO(newUser);
  }
}
