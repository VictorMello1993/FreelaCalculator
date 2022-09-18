import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { EditJobInputModel } from "../../../dtos/jobs/EditJobInputModel";
import { JobViewModel } from "../../../dtos/jobs/JobViewModel";
import { IJobsRepository } from "../../../repositories/IJobsRepository";
import { IEditJobUseCase } from "./IEditJobUseCase";

@injectable()
export class EditJobUseCase implements IEditJobUseCase {
  private readonly _jobsRepository: IJobsRepository;

  constructor(
    @inject(TYPES.IJobsRepository)
    private jobsRepository: IJobsRepository,
  ) {
    this._jobsRepository = jobsRepository;
  }

  async execute({ id, name, DailyHours, TotalHours, UserId }: EditJobInputModel): Promise<JobViewModel> {
    const job = await this._jobsRepository.findById(id);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    const jobEdited = await this._jobsRepository.update({ id, name, DailyHours, TotalHours, UserId });

    return {
      id: jobEdited.id,
      name,
      DailyHours,
      TotalHours,
      UserId,
      CreatedAt: jobEdited.CreatedAt,
      UpdatedAt: jobEdited.UpdatedAt,
    };
  }
}
