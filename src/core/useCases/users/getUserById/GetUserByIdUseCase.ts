import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { UserViewModel } from "../../../dtos/users/UserViewModel";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IGetUserByIdUseCase } from "./IGetUserByIdUseCase";

@injectable()
export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) {
    this._usersRepository = usersRepository;
  }

  async execute(id: string): Promise<UserViewModel> {
    const user = await this._usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      id,
      name: user.name,
      email: user.email,
      MonthlyBudget: user.MonthlyBudget,
      ZipCode: user.ZipCode,
      VacationPerYear: user.VacationPerYear,
      DaysPerWeek: user.DaysPerWeek,
      HoursPerDay: user.HoursPerDay,
      ValueHour: user.ValueHour,
      CreatedAt: user.CreatedAt,
      UpdatedAt: user.UpdatedAt,
      active: user.active,
      JobList: user.JobList,
    };
  }
}
