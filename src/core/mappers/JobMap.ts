import { Job } from "../entities/Job";

export class JobMap {
  static toDTO({ id, name, DailyHours, TotalHours, UserId, CreatedAt, UpdatedAt }: Job) {
    return {
      id,
      name,
      DailyHours,
      TotalHours,
      UserId,
      CreatedAt,
      UpdatedAt,
    };
  }
}
