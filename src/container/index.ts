import { Container } from "inversify";
import { IJobsRepository } from "../core/repositories/IJobsRepository";
import { IUsersRepository } from "../core/repositories/IUsersRepository";
import { CreateJobUseCase } from "../core/useCases/jobs/createJob/CreateJobUseCase";
import { ICreateJobUseCase } from "../core/useCases/jobs/createJob/ICreateJobUseCase";
import { DeleteJobUseCase } from "../core/useCases/jobs/deleteJob/DeleteJobUseCase";
import { IDeleteJobUseCase } from "../core/useCases/jobs/deleteJob/IDeleteJobUseCase";
import { EditJobUseCase } from "../core/useCases/jobs/editJob/EditJobUseCase";
import { IEditJobUseCase } from "../core/useCases/jobs/editJob/IEditJobUseCase";
import { AuthenticateUserUseCase } from "../core/useCases/users/auth/AuthenticateUserUseCase";
import { IAuthenticateUserUseCase } from "../core/useCases/users/auth/IAuthenticateUserUseCase";
import { CreateUserUseCase } from "../core/useCases/users/createUser/CreateUserUseCase";
import { ICreateUserUseCase } from "../core/useCases/users/createUser/ICreateUserUseCase";
import { IInactivateUserUseCase } from "../core/useCases/users/deleteUser/IInactivateUserUseCase";
import { InactivateUserUseCase } from "../core/useCases/users/deleteUser/InactivateUserUseCase";
import { EditUserProfileUseCase } from "../core/useCases/users/editUser/EditUserProfileUseCase";
import { IEditUserProfileUseCase } from "../core/useCases/users/editUser/IEditUserProfileUseCase";
import { GetUserByIdUseCase } from "../core/useCases/users/getUserById/GetUserByIdUseCase";
import { IGetUserByIdUseCase } from "../core/useCases/users/getUserById/IGetUserByIdUseCase";
import { JobsRepository } from "../infra/in-memory/repositories/JobsRepository";
import { UsersRepository } from "../infra/in-memory/repositories/UsersRepository";
import { IFindAddressProvider } from "../core/providers/IFindAddressProvider";

import { TYPES } from "../types";
import { ViaCepFindAddressProvider } from "../infra/providers/ViaCepFindAddressProvider";

export const container = new Container();

container.bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository);
container.bind<IJobsRepository>(TYPES.IJobsRepository).to(JobsRepository);
container.bind<ICreateUserUseCase>(TYPES.ICreateUserUseCase).to(CreateUserUseCase);
container.bind<ICreateJobUseCase>(TYPES.ICreateJobUseCase).to(CreateJobUseCase);
container.bind<IEditUserProfileUseCase>(TYPES.IEditUserProfileUseCase).to(EditUserProfileUseCase);
container.bind<IInactivateUserUseCase>(TYPES.IInactivateUserUseCase).to(InactivateUserUseCase);
container.bind<IEditJobUseCase>(TYPES.IEditJobUseCase).to(EditJobUseCase);
container.bind<IAuthenticateUserUseCase>(TYPES.IAuthenticateUserUseCase).to(AuthenticateUserUseCase);
container.bind<IDeleteJobUseCase>(TYPES.IDeleteJobUseCase).to(DeleteJobUseCase);
container.bind<IGetUserByIdUseCase>(TYPES.IGetUserByIdUseCase).to(GetUserByIdUseCase);
container.bind<IFindAddressProvider>(TYPES.IFindAddressProvider).to(ViaCepFindAddressProvider);
