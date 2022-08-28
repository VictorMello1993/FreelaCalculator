import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { EditJobInputModel } from "../../../dtos/jobs/EditJobInputModel";
import { JobMap } from "../../../mappers/JobMap";
import { IJobsRepository } from "../../../repositories/IJobsRepository";

@injectable()
export class EditJobUseCase {
  private readonly _jobsRepository: IJobsRepository;

  constructor(
    @inject(TYPES.IJobsRepository)
    private jobsRepository: IJobsRepository,
  ) {
    this._jobsRepository = jobsRepository;
  }

  execute({ id, name, DailyHours, TotalHours, UserId }: EditJobInputModel) {
    const job = this._jobsRepository.findById(id);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    const jobEdited = this._jobsRepository.update({ id, name, DailyHours, TotalHours, UserId });

    const jobDTO = JobMap.toDTO(jobEdited);

    return jobDTO;
  }
}
