import { CreateJobInputModel } from "../dtos/jobs/CreateJobInputModel";
import { EditJobInputModel } from "../dtos/jobs/EditJobInputModel";
import { Job } from "../entities/Job";

export interface IJobsRepository {
  create(data: CreateJobInputModel): Promise<Job>;
  findById(id: string): Promise<Job>;
  update(data: EditJobInputModel): Promise<Job>;
  findByName(name: string): Promise<Job>;
  delete(id: string): Promise<void>;
}
