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
    const result = await this._userDbModel.find();

    if (result.length > 0) {
      const user = result.find((item) => item.id === id);

      return user
        ? User.build(
          user.id,
          user.name,
          user.email,
          user.password,
          user.BirthDate,
          user.CreatedAt,
          user.UpdatedAt,
          user.MonthlyBudget,
          user.ZipCode,
          user.VacationPerYear,
          user.DaysPerWeek,
          user.HoursPerDay,
          user.ValueHour,
          user.active,
          user.JobList,
        )
        : null;
    }

    return null;
  }

  async update(model: UpdateUserInputModel): Promise<User> {
    const where = { id: model.id };
    await this._userDbModel.updateOne(where, model.data);

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
    const user = await this._userDbModel.findOne({ id }).lean().exec();

    user.active = false;

    await this._userDbModel.updateOne({ id }, user);
  }

  async addJobItem(id: string, job: Job): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteJobItem(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
