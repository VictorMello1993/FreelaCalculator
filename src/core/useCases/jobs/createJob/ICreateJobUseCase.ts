import { CreateJobInputModel } from "../../../dtos/jobs/CreateJobInputModel";
import { JobViewModel } from "../../../dtos/jobs/JobViewModel";

export interface ICreateJobUseCase {
  execute(data: CreateJobInputModel): Promise<JobViewModel>;
}
