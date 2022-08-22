import { Container } from "inversify";
import { CreateUserInterface } from "../core/useCases/users/createUser/CreateUserInterface";
import { CreateUserUseCase } from "../core/useCases/users/createUser/CreateUserUseCase";
import { TYPES } from "../types";

export const container = new Container();

container.bind<CreateUserInterface>(TYPES.CreateUserInterface).to(CreateUserUseCase);
