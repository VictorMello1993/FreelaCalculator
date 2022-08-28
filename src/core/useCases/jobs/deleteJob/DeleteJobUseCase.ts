import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { IJobsRepository } from "../../../repositories/IJobsRepository";
import { IDeleteJobUseCase } from "./IDeleteJobUseCase";

@injectable()
export class DeleteJobUseCase implements IDeleteJobUseCase {
  private readonly _jobsRepository: IJobsRepository;

  constructor(
    @inject(TYPES.IJobsRepository)
    private jobsRepository: IJobsRepository,
  ) {
    this._jobsRepository = jobsRepository;
  }

  execute(id: string) {
    const job = this.jobsRepository.findById(id);

    if (!job) {
      throw new AppError("Job not found");
    }

    this._jobsRepository.delete(id);
  }
}
