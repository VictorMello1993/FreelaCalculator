import { Container } from "inversify";
import { IJobsRepository } from "../core/repositories/IJobsRepository";
import { IUsersRepository } from "../core/repositories/IUsersRepository";
import { CreateJobUseCase } from "../core/useCases/jobs/createJob/CreateJobUseCase";
import { CreateUserUseCase } from "../core/useCases/users/createUser/CreateUserUseCase";
import { JobsRepository } from "../infra/repositories/JobsRepository";
import { UsersRepository } from "../infra/repositories/UsersRepository";
import { TYPES } from "../types";

export const container = new Container();

container.bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository);
container.bind<IJobsRepository>(TYPES.IJobsRepository).to(JobsRepository);
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase);
container.bind<CreateJobUseCase>(TYPES.CreateJobUseCase).to(CreateJobUseCase);
