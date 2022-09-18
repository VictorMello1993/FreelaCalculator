export function CalculateValueHour(...payload: any): number {
  const [VacationPerYear, HoursPerDay, DaysPerWeek, MonthlyBudget] = payload;

  // 1 ano (em semanas)
  const weeksPerYear = 52;

  // Removendo as semanas de férias, para obter quantas semanas tem em 1 mês
  const weeksPerMonth = (weeksPerYear - VacationPerYear) / 12;

  // Total de horas trabalhadas na semana
  const weeksTotalHours = HoursPerDay * DaysPerWeek;

  // Total de horas trabalhadas no mês
  const monthlyTotalHours = weeksTotalHours * weeksPerMonth;

  // Valor da hora
  return MonthlyBudget / monthlyTotalHours;
}
