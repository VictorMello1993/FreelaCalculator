import { inject, injectable } from "inversify";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { TYPES } from "../../../../types";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  execute({
    name,
    email,
    password,
    BirthDate,
    MonthlyBudget,
    ZipCode,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
  }: CreateUserInputModel) {
    const user = this.usersRepository.findByEmail(email);

    if (user) {
      throw new Error("User already exists");
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

    const newUser = this.usersRepository.create({
      name,
      email,
      password,
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
