import { injectable } from "inversify";
import { CreateJobInputModel } from "../../../core/dtos/jobs/CreateJobInputModel";
import { EditJobInputModel } from "../../../core/dtos/jobs/EditJobInputModel";
import { Job } from "../../../core/entities/Job";
import { IJobsRepository } from "../../../core/repositories/IJobsRepository";

const jobs: Job[] = [];

@injectable()
export class JobsRepository implements IJobsRepository {
  async create(data: CreateJobInputModel): Promise<Job> {
    const job = new Job();

    job.name = data.name;
    job.DailyHours = data.DailyHours;
    job.TotalHours = data.TotalHours;
    job.UserId = data.UserId;

    jobs.push(job);

    return job;
  }

  async update({ id, name, DailyHours, TotalHours, UserId }: EditJobInputModel): Promise<Job> {
    const index = jobs.findIndex((job) => job.id === id);

    if (index !== -1) {
      jobs[index].name = name;
      jobs[index].DailyHours = DailyHours;
      jobs[index].TotalHours = TotalHours;
      jobs[index].UserId = UserId;
      jobs[index].UpdatedAt = new Date();

      return jobs[index];
    }

    return null;
  }

  async findById(id: string): Promise<Job> {
    return jobs.find((job) => job.id === id);
  }

  async findByName(name: string): Promise<Job> {
    return jobs.find((job) => job.name === name);
  }

  async delete(id: string): Promise<void> {
    const index = jobs.findIndex((job) => job.id === id);

    if (index !== -1) {
      jobs.splice(index, 1);
    }

    console.log(jobs.length);
  }
}
