import mongoose, { Model, model } from "mongoose";

export interface IJobDbModel {
  id: string;
  name: string;
  DailyHours: number;
  TotalHours: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  UserId: string;
}

const JobSchema = new mongoose.Schema<IJobDbModel>({
  name: { type: String, required: true },
  DailyHours: { type: Number, required: true },
  TotalHours: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: null },
  UserId: { type: String, required: true },
});

export const JobDbModel: Model<IJobDbModel> = model("jobs", JobSchema);
