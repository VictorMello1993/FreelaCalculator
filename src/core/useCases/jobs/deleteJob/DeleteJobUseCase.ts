import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { IJobsRepository } from "../../../repositories/IJobsRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IDeleteJobUseCase } from "./IDeleteJobUseCase";

@injectable()
export class DeleteJobUseCase implements IDeleteJobUseCase {
  private readonly _jobsRepository: IJobsRepository;
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IJobsRepository)
    private jobsRepository: IJobsRepository,
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) {
    this._jobsRepository = jobsRepository;
    this._usersRepository = usersRepository;
  }

  execute(id: string) {
    const job = this._jobsRepository.findById(id);

    if (!job) {
      throw new AppError("Job not found");
    }

    this._jobsRepository.delete(id);
    this._usersRepository.deleteJobItem(job.UserId);
  }
}
