import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { UpdateUserInputModel } from "../../../dtos/users/UpdateUserInputModel";
import { UserViewModel } from "../../../dtos/users/UserViewModel";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { CalculateValueHour } from "../../../services/CalculateValueHour";
import { FindAddress } from "../../../services/FindAddress";
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

  async execute(model: UpdateUserInputModel): Promise<UserViewModel> {
    const user = await this._usersRepository.findById(model.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { id } = model;
    const { name, email, MonthlyBudget, VacationPerYear, DaysPerWeek, HoursPerDay, ZipCode } = model.data;

    const valueHour = CalculateValueHour(model, HoursPerDay, DaysPerWeek, MonthlyBudget);
    const address = await FindAddress(ZipCode);

    model.data.ValueHour = valueHour;

    const updatedUser = await this._usersRepository.update(model);

    return {
      id,
      name,
      email,
      MonthlyBudget,
      ZipCode,
      Address: address,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour: valueHour,
      UpdatedAt: updatedUser.UpdatedAt,
      active: updatedUser.active,
    };
  }
}
