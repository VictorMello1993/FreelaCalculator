import { v4 as uuid } from "uuid";

export class Job {
  id: string;
  name: string;
  DailyHours: number;
  TotalHours: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  UserId: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.CreatedAt = new Date();
    }
  }

  static build(
    id: string,
    name: string,
    DailyHours: number,
    TotalHours: number,
    CreatedAt: Date,
    UpdatedAt: Date,
    UserId: string,
  ): Job {
    return {
      id,
      name,
      DailyHours,
      TotalHours,
      CreatedAt,
      UpdatedAt,
      UserId,
    };
  }
}
