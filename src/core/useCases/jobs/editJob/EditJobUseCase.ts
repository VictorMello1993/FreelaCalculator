import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { EditJobInputModel } from "../../../dtos/jobs/EditJobInputModel";
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

  execute({ name, DailyHours, TotalHours }: EditJobInputModel.Body, { id }: EditJobInputModel.Params) {
    const job = this._jobsRepository.findById(id);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    const result = this._jobsRepository.update({ name, DailyHours, TotalHours }, { id });

    return result;
  }
}
