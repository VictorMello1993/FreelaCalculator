import { CreateJobInputModel } from "../../../dtos/jobs/CreateJobInputModel";
import { JobMap } from "../../../mappers/JobMap";

export interface ICreateJobUseCase {
  execute(data: CreateJobInputModel): JobMap;
}
