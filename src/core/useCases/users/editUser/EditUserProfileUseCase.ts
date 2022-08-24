import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { UpdateUserInputModel } from "../../../dtos/users/UpdateUserInputModel";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

@injectable()
export class EditUserProfileUseCase {
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IUsersRepository)
    usersRepository: IUsersRepository,
  ) {
    this._usersRepository = usersRepository;
  }

  execute({ id, name, email, MonthlyBudget, VacationPerYear, DaysPerWeek, HoursPerDay }: UpdateUserInputModel) {
    console.log("id", id);
    const user = this._usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // 1 ano (em semanas)
    const weeksPerYear = 52;

    // Removendo as semanas de férias, para obter quantas semanas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - VacationPerYear) / 12;

    // Total de horas trabalhadas na semana
    const weeksTotalHours = HoursPerDay * DaysPerWeek;

    // Total de horas trabalhadas no mês
    const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

    // Valor da hora
    const valueHour = MonthlyBudget / monthlyTotalHours;

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

    return updatedUser;
  }
}
