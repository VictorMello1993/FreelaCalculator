import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { CreateJobInputModel } from "../../../dtos/jobs/CreateJobInputModel";
import { JobMap } from "../../../mappers/JobMap";
import { IJobsRepository } from "../../../repositories/IJobsRepository";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ICreateJobUseCase } from "./ICreateJobUseCase";

@injectable()
export class CreateJobUseCase implements ICreateJobUseCase {
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

  execute({ name, DailyHours, TotalHours, UserId }: CreateJobInputModel): JobMap {
    const job = this._jobsRepository.findByName(name);

    if (job) {
      throw new AppError("Job already exists");
    }

    const newJob = this._jobsRepository.create({ name, DailyHours, TotalHours, UserId });
    const jobDTO = JobMap.toDTO(newJob);

    this._usersRepository.addJobItem(UserId, newJob);

    return jobDTO;
  }
}
