import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { UpdateUserInputModel } from "../../../dtos/users/UpdateUserInputModel";
import { UserViewModel } from "../../../dtos/users/UserViewModel";
import { IFindAddressProvider } from "../../../providers/IFindAddressProvider";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { CalculateValueHour } from "../../../services/CalculateValueHour";
import { IEditUserProfileUseCase } from "./IEditUserProfileUseCase";

@injectable()
export class EditUserProfileUseCase implements IEditUserProfileUseCase {
  private readonly _usersRepository: IUsersRepository;
  private readonly _findAddressProvider: IFindAddressProvider;

  constructor(
    @inject(TYPES.IUsersRepository)
    usersRepository: IUsersRepository,
    @inject(TYPES.IFindAddressProvider)
    findAddressProvider: IFindAddressProvider,
  ) {
    this._usersRepository = usersRepository;
    this._findAddressProvider = findAddressProvider;
  }

  async execute(model: UpdateUserInputModel): Promise<UserViewModel> {
    const user = await this._usersRepository.findById(model.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { id } = model;
    const { name, email, MonthlyBudget, VacationPerYear, DaysPerWeek, HoursPerDay, ZipCode } = model.data;

    const valueHour = CalculateValueHour(VacationPerYear, HoursPerDay, DaysPerWeek, MonthlyBudget);
    const address = await this._findAddressProvider.FindAddress(ZipCode);

    model.data.ValueHour = valueHour;
    model.data.UpdatedAt = new Date();

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
