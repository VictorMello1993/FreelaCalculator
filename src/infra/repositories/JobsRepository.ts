import { injectable } from "inversify";
import { CreateJobInputModel } from "../../core/dtos/jobs/CreateJobInputModel";
import { EditJobInputModel } from "../../core/dtos/jobs/EditJobInputModel";
import { Job } from "../../core/entities/Job";
import { IJobsRepository } from "../../core/repositories/IJobsRepository";
import { jobs } from "../database/db";

@injectable()
export class JobsRepository implements IJobsRepository {
  create(data: CreateJobInputModel.Body): Job {
    const job = new Job();

    job.name = data.name;
    job.DailyHours = data.DailyHours;
    job.TotalHours = data.TotalHours;

    jobs.push(job);

    return job;
  }

  update({ name, DailyHours, TotalHours }: EditJobInputModel.Body, { id }: EditJobInputModel.Params): Job {
    const index = jobs.findIndex((job) => job.id === id);

    if (index !== -1) {
      jobs[index].name = name;
      jobs[index].DailyHours = DailyHours;
      jobs[index].TotalHours = TotalHours;
      jobs[index].UpdatedAt = new Date();

      return jobs[index];
    }

    return null;
  }

  findById(id: string): Job {
    return jobs.find((job) => job.id === id);
  }

  findByName(name: string): Job {
    return jobs.find((job) => job.name === name);
  }
}
