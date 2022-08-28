import { Container } from "inversify";
import { IJobsRepository } from "../core/repositories/IJobsRepository";
import { IUsersRepository } from "../core/repositories/IUsersRepository";
import { CreateJobUseCase } from "../core/useCases/jobs/createJob/CreateJobUseCase";
import { DeleteJobUseCase } from "../core/useCases/jobs/deleteJob/DeleteJobUseCase";
import { EditJobUseCase } from "../core/useCases/jobs/editJob/EditJobUseCase";
import { AuthenticateUserUseCase } from "../core/useCases/users/auth/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../core/useCases/users/createUser/CreateUserUseCase";
import { ICreateUserUseCase } from "../core/useCases/users/createUser/ICreateUserUseCase";
import { InactivateUserUseCase } from "../core/useCases/users/deleteUser/InactivateUserUseCase";
import { EditUserProfileUseCase } from "../core/useCases/users/editUser/EditUserProfileUseCase";
import { JobsRepository } from "../infra/repositories/JobsRepository";
import { UsersRepository } from "../infra/repositories/UsersRepository";
import { TYPES } from "../types";

export const container = new Container();

container.bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository);
container.bind<IJobsRepository>(TYPES.IJobsRepository).to(JobsRepository);
container.bind<ICreateUserUseCase>(TYPES.ICreateUserUseCase).to(CreateUserUseCase);
container.bind<CreateJobUseCase>(TYPES.ICreateJobUseCase).to(CreateJobUseCase);
container.bind<EditUserProfileUseCase>(TYPES.IEditUserProfileUseCase).to(EditUserProfileUseCase);
container.bind<InactivateUserUseCase>(TYPES.IInactivateUserUseCase).to(InactivateUserUseCase);
container.bind<EditJobUseCase>(TYPES.IEditJobUseCase).to(EditJobUseCase);
container.bind<AuthenticateUserUseCase>(TYPES.IAuthenticateUserUseCase).to(AuthenticateUserUseCase);
container.bind<DeleteJobUseCase>(TYPES.IDeleteJobUseCase).to(DeleteJobUseCase);
