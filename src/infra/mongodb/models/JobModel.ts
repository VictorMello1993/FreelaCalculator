import mongoose, { Model, model, Schema } from "mongoose";

export interface IJobDbModel {
  id: string;
  name: string;
  DailyHours: number;
  TotalHours: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  UserId: any;
}

const JobSchema = new mongoose.Schema<IJobDbModel>({
  name: { type: String, required: true },
  DailyHours: { type: Number, required: true },
  TotalHours: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: null },
  UserId: { type: Schema.Types.ObjectId, required: true },
});

export const JobDbModel: Model<IJobDbModel> = model("jobs", JobSchema);
