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
    const result = await this._jobDbModel.find();

    if (result.length > 0) {
      const job = result.find((item) => item.id === id);

      return job;
    }

    return null;
  }

  async update({ id, name, DailyHours, TotalHours, CreatedAt, UserId }: EditJobInputModel): Promise<Job> {
    const doc = await this._jobDbModel.findOne({ _id: id });

    const dataToUpdate = {
      id,
      name,
      DailyHours,
      TotalHours,
      UserId,
      CreatedAt,
      UpdatedAt: new Date(),
    };

    await doc.updateOne(dataToUpdate);

    return Job.build(id, name, DailyHours, TotalHours, CreatedAt, dataToUpdate.UpdatedAt, UserId);
  }

  async findByName(name: string): Promise<Job> {
    return await this._jobDbModel.findOne({ name });
  }

  async delete(id: string): Promise<void> {
    const doc = await this._jobDbModel.findOne({ _id: id });

    const where = { id };

    await doc.deleteOne(where);
  }
}
