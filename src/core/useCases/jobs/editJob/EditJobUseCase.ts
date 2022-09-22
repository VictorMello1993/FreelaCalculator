import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { EditJobInputModel } from "../../../dtos/jobs/EditJobInputModel";
import { JobViewModel } from "../../../dtos/jobs/JobViewModel";
import { IJobsRepository } from "../../../repositories/IJobsRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IEditJobUseCase } from "./IEditJobUseCase";

@injectable()
export class EditJobUseCase implements IEditJobUseCase {
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

  async execute({ id, name, DailyHours, TotalHours, UserId }: EditJobInputModel): Promise<JobViewModel> {
    const job = await this._jobsRepository.findById(id);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    const jobEdited = await this._jobsRepository.update({
      id,
      name,
      DailyHours,
      TotalHours,
      UserId,
      CreatedAt: job.CreatedAt,
    });

    await this._usersRepository.saveJobItem(UserId, jobEdited);

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
