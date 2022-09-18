import mongoose, { model, Model } from "mongoose";

export interface IUserDbModel {
  id: string;
  name: string;
  email: string;
  password: string;
  BirthDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
  MonthlyBudget: number;
  ZipCode: string;
  VacationPerYear: number;
  DaysPerWeek: number;
  HoursPerDay: number;
  ValueHour: number;
  active: boolean;
  JobList?: [
    {
      id: string;
      name: string;
      DailyHours: number;
      TotalHours: number;
      CreatedAt: Date;
      UpdatedAt: Date;
      UserId: string;
    },
  ];
}

const UsersSchema = new mongoose.Schema<IUserDbModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  BirthDate: { type: Date, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: null },
  MonthlyBudget: { type: Number, required: true },
  ZipCode: { type: String, required: true },
  VacationPerYear: { type: Number, required: true },
  DaysPerWeek: { type: Number, required: true },
  HoursPerDay: { type: Number, required: true },
  ValueHour: { type: Number, required: true },
  active: { type: Boolean, default: true },
  JobList: [
    {
      name: { type: String, required: true },
      DailyHours: { type: Number, required: true },
      TotalHours: { type: Number, required: true },
      CreatedAt: { type: Date, required: Date.now },
      UpdatedAt: { type: Date, required: true, default: null },
      UserId: { type: String, required: true },
    },
  ],
});

export const UserDbModel: Model<IUserDbModel> = model("users", UsersSchema);
