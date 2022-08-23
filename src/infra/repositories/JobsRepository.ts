import { injectable } from "inversify";
import { CreateJobInputModel } from "../../core/dtos/jobs/CreateJobInputModel";
import { Job } from "../../core/entities/Job";
import { IJobsRepository } from "../../core/repositories/IJobsRepository";
import { jobs } from "../database/db";

@injectable()
export class JobsRepository implements IJobsRepository {
  create(data: CreateJobInputModel): Job {
    const job = new Job();

    job.name = data.name;
    job.DailyHours = data.DailyHours;
    job.TotalHours = data.TotalHours;

    jobs.push(job);

    return job;
  }
}
