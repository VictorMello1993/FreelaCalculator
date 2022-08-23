import { inject, injectable } from "inversify";
import { TYPES } from "../../../../types";
import { CreateJobInputModel } from "../../../dtos/jobs/CreateJobInputModel";
import { IJobsRepository } from "../../../repositories/IJobsRepository";
import { v4 as uuid } from "uuid";
import { jobs } from "../../../../infra/database/db";

@injectable()
export class CreateJobUseCase {
  constructor(
    @inject(TYPES.IJobsRepository)
    private jobsRepository: IJobsRepository,
  ) { }

  execute(data: CreateJobInputModel) {
    const job = Object.assign({
      id: uuid(),
      name: data.name,
      CreatedAt: new Date(),
      DailyHours: data.DailyHours,
      TotalHours: data.TotalHours,
    });

    jobs.push(job);

    return job;
  }
}
