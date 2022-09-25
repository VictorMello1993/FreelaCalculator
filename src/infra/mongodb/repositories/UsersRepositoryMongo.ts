import { injectable } from "inversify";
import { Model } from "mongoose";
import { CreateUserInputModel } from "../../../core/dtos/users/CreateUserInputModel";
import { UpdateUserInputModel } from "../../../core/dtos/users/UpdateUserInputModel";
import { Job } from "../../../core/entities/Job";
import { User } from "../../../core/entities/User";
import { IUsersRepository } from "../../../core/repositories/IUsersRepository";
import { IUserDbModel, UserDbModel } from "../models/UserModel";

@injectable()
export class UsersRepositoryMongo implements IUsersRepository {
  private readonly _userDbModel: Model<IUserDbModel>;

  constructor() {
    this._userDbModel = UserDbModel;
  }

  async create({
    name,
    email,
    password,
    BirthDate,
    MonthlyBudget,
    ZipCode,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
    ValueHour,
    CreatedAt,
    UpdatedAt,
    active,
  }: CreateUserInputModel): Promise<User> {
    const dataModel = {
      name,
      email,
      password,
      BirthDate,
      MonthlyBudget,
      ZipCode,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour,
      CreatedAt,
      UpdatedAt,
      active,
    };

    const result = await new this._userDbModel(dataModel).save();

    return User.build(
      result._id.toString(),
      name,
      email,
      password,
      BirthDate,
      CreatedAt,
      UpdatedAt,
      MonthlyBudget,
      ZipCode,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour,
      active,
    );
  }

  async findByEmail(email: string): Promise<User> {
    return await this._userDbModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this._userDbModel.findOne({ _id: id });
  }

  async update(model: UpdateUserInputModel): Promise<User> {
    const doc = this._userDbModel.findOne({ _id: model.id });

    await doc.updateOne(model.data);

    const { name, email, MonthlyBudget, VacationPerYear, DaysPerWeek, HoursPerDay, ValueHour, UpdatedAt, ZipCode } =
      model.data;

    return User.build(
      model.id,
      name,
      email,
      "",
      null,
      null,
      UpdatedAt,
      MonthlyBudget,
      ZipCode,
      VacationPerYear,
      DaysPerWeek,
      HoursPerDay,
      ValueHour,
      true,
    );
  }

  async inactivateUser(id: string): Promise<void> {
    const doc = this._userDbModel.findOne({ _id: id });

    await doc.updateOne({ active: false });
  }

  async saveJobItem(id: string, job: Job): Promise<void> {
    const userDoc = await this._userDbModel.findOne({ _id: id });
    const index = userDoc.JobList.findIndex((item) => item.id.toString() === job.id);

    if (index === -1) {
      userDoc.JobList.push(job);
    } else {
      userDoc.JobList[index] = job;
    }

    await userDoc.updateOne({ JobList: userDoc.JobList });
  }

  async deleteJobItem(id: string, job: Job): Promise<void> {
    const userDoc = await this._userDbModel.findOne({ _id: id });
    const index = userDoc.JobList.findIndex((item) => item.id.toString() === job.id);

    if (index !== -1) {
      userDoc.JobList.splice(index, 1);
      await userDoc.updateOne({ JobList: userDoc.JobList });
    }
  }
}
