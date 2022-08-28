import { Container } from "inversify";
import { IJobsRepository } from "../core/repositories/IJobsRepository";
import { IUsersRepository } from "../core/repositories/IUsersRepository";
import { CreateJobUseCase } from "../core/useCases/jobs/createJob/CreateJobUseCase";
import { DeleteJobUseCase } from "../core/useCases/jobs/deleteJob/DeleteJobUseCase";
import { EditJobUseCase } from "../core/useCases/jobs/editJob/EditJobUseCase";
import { AuthenticateUserUseCase } from "../core/useCases/users/auth/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../core/useCases/users/createUser/CreateUserUseCase";
import { InactivateUserUseCase } from "../core/useCases/users/deleteUser/InactivateUserUseCase";
import { EditUserProfileUseCase } from "../core/useCases/users/editUser/EditUserProfileUseCase";
import { JobsRepository } from "../infra/repositories/JobsRepository";
import { UsersRepository } from "../infra/repositories/UsersRepository";
import { TYPES } from "../types";

export const container = new Container();

container.bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository);
container.bind<IJobsRepository>(TYPES.IJobsRepository).to(JobsRepository);
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase);
container.bind<CreateJobUseCase>(TYPES.CreateJobUseCase).to(CreateJobUseCase);
container.bind<EditUserProfileUseCase>(TYPES.EditUserProfileUseCase).to(EditUserProfileUseCase);
container.bind<InactivateUserUseCase>(TYPES.InactivateUserUseCase).to(InactivateUserUseCase);
container.bind<EditJobUseCase>(TYPES.EditJobUseCase).to(EditJobUseCase);
container.bind<AuthenticateUserUseCase>(TYPES.AuthenticateUserUseCase).to(AuthenticateUserUseCase);
container.bind<DeleteJobUseCase>(TYPES.DeleteJobUseCase).to(DeleteJobUseCase);
