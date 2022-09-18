import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { UpdateUserInputModel } from "../../../dtos/users/UpdateUserInputModel";
import { UserViewModel } from "../../../dtos/users/UserViewModel";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { CalculateValueHour } from "../../../services/CalculateValueHour";
import { IEditUserProfileUseCase } from "./IEditUserProfileUseCase";

@injectable()
export class EditUserProfileUseCase implements IEditUserProfileUseCase {
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
  }: UpdateUserInputModel): Promise<UserViewModel> {
    const user = await this._usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const valueHour = CalculateValueHour(VacationPerYear, HoursPerDay, DaysPerWeek, MonthlyBudget);

    const updatedUser = await this._usersRepository.update({
      id,
      name,
      email,
      MonthlyBudget,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour: valueHour,
    });

    return {
      id,
      name,
      email,
      MonthlyBudget,
      ZipCode: updatedUser.ZipCode,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour: updatedUser.ValueHour,
      UpdatedAt: updatedUser.UpdatedAt,
      active: updatedUser.active,
    };
  }
}
