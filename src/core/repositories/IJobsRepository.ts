import { CreateJobInputModel } from "../dtos/jobs/CreateJobInputModel";
import { EditJobInputModel } from "../dtos/jobs/EditJobInputModel";
import { Job } from "../entities/Job";

export interface IJobsRepository {
  create(data: CreateJobInputModel.Body): Job;
  findById(id: string): Job;
  update(data: EditJobInputModel.Body, id: EditJobInputModel.Params): Job;
  findByName(name: string): Job;
  delete(id: string): void;
}
