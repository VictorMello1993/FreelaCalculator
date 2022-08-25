import { v4 as uuid } from "uuid";

export class Job {
  id: string;
  name: string;
  DailyHours: number;
  TotalHours: number;
  CreatedAt: Date;
  UpdatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.CreatedAt = new Date();
    }
  }
}
