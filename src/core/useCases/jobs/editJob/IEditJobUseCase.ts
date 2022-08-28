import { EditJobInputModel } from "../../../dtos/jobs/EditJobInputModel";
import { JobMap } from "../../../mappers/JobMap";

export interface IEditJobUseCase {
  execute(data: EditJobInputModel): JobMap;
}
