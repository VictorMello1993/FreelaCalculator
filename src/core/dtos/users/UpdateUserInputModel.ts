export class UpdateUserInputModel {
  id: string;
  data: {
    name: string;
    email: string;
    ZipCode: string;
    MonthlyBudget: number;
    VacationPerYear: number;
    DaysPerWeek: number;
    HoursPerDay: number;
    ValueHour?: number;
    active?: boolean;
    UpdatedAt?: Date;
  };
}
