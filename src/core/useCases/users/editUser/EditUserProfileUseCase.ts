import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { UpdateUserInputModel } from "../../../dtos/users/UpdateUserInputModel";
import { UserMap } from "../../../mappers/UserMap";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { CalculateValueHour } from "../../../services/CalculateValueHour";

@injectable()
export class EditUserProfileUseCase {
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IUsersRepository)
    usersRepository: IUsersRepository,
  ) {
    this._usersRepository = usersRepository;
  }

  async execute({
    id,
    name,
    email,
    MonthlyBudget,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
  }: UpdateUserInputModel): Promise<UserMap> {
    const user = this._usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const valueHour = CalculateValueHour(VacationPerYear, HoursPerDay, DaysPerWeek, MonthlyBudget);

    const updatedUser = this._usersRepository.update({
      id,
      name,
      email,
      MonthlyBudget,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour: valueHour,
    });

    return UserMap.toDTO(updatedUser);
  }
}
