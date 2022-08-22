import { Container } from "inversify";
import { IUsersRepository } from "../core/repositories/IUsersRepository";
import { CreateUserUseCase } from "../core/useCases/users/createUser/CreateUserUseCase";
import { UsersRepository } from "../infra/repositories/UsersRepository";
import { TYPES } from "../types";

export const container = new Container();

container.bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository);
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase);
