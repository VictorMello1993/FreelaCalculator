import { v4 as uuid } from "uuid";

export class Job {
  id: string;
  name: string;
  DailyHours: number;
  TotalHours: number;
  CreatedAt: Number;
  UpdatedAt: Number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
