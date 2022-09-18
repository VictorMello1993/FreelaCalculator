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
    id,
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
      id,
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

    await new this._userDbModel(dataModel).save();

    return User.build(
      id,
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

  async update({
    id,
    name,
    email,
    MonthlyBudget,
    VacationPerYear,
    DaysPerWeek,
    HoursPerDay,
    ValueHour,
  }: UpdateUserInputModel): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async inactivateUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async addJobItem(id: string, job: Job): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteJobItem(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
