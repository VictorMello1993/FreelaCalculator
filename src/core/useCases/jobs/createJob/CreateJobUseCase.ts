import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { CreateJobInputModel } from "../../../dtos/jobs/CreateJobInputModel";
import { IJobsRepository } from "../../../repositories/IJobsRepository";

@injectable()
export class CreateJobUseCase {
  private readonly _jobsRepository: IJobsRepository;

  constructor(
    @inject(TYPES.IJobsRepository)
    private jobsRepository: IJobsRepository,
  ) {
    this._jobsRepository = jobsRepository;
  }

  execute({ name, DailyHours, TotalHours }: CreateJobInputModel.Body) {
    const job = this._jobsRepository.findByName(name);

    if (job) {
      throw new AppError("Job already exists");
    }

    const result = this._jobsRepository.create({ name, DailyHours, TotalHours });
    return result;
  }
}
