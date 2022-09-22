import { injectable } from "inversify";
import { Model } from "mongoose";
import { CreateJobInputModel } from "../../../core/dtos/jobs/CreateJobInputModel";
import { EditJobInputModel } from "../../../core/dtos/jobs/EditJobInputModel";
import { Job } from "../../../core/entities/Job";
import { IJobsRepository } from "../../../core/repositories/IJobsRepository";
import { IJobDbModel, JobDbModel } from "../models/JobModel";

@injectable()
export class JobsRepositoryMongo implements IJobsRepository {
  private readonly _jobDbModel: Model<IJobDbModel>;

  constructor() {
    this._jobDbModel = JobDbModel;
  }

  async create({ name, DailyHours, TotalHours, UserId }: CreateJobInputModel): Promise<Job> {
    const dataModel = {
      name,
      DailyHours,
      TotalHours,
      UserId,
    };

    const result = await new this._jobDbModel(dataModel).save();

    return Job.build(result._id.toString(), name, DailyHours, TotalHours, new Date(), null, UserId);
  }

  async findById(id: string): Promise<Job> {
    return await this._jobDbModel.findOne({ id });
  }

  async update({ id, name, DailyHours, TotalHours, CreatedAt, UserId }: EditJobInputModel): Promise<Job> {
    const where = { id };

    const dataToUpdate = {
      name,
      DailyHours,
      TotalHours,
      UserId,
      CreatedAt,
      UpdatedAt: new Date(),
    };

    await this._jobDbModel.updateOne(where, dataToUpdate);

    return Job.build(id, name, DailyHours, TotalHours, CreatedAt, dataToUpdate.UpdatedAt, UserId);
  }

  async findByName(name: string): Promise<Job> {
    return await this._jobDbModel.findOne({ name });
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
