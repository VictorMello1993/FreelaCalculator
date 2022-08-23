import { CreateJobInputModel } from "../dtos/jobs/CreateJobInputModel";
import { Job } from "../entities/Job";

export interface IJobsRepository {
  create(data: CreateJobInputModel): Job;
}
