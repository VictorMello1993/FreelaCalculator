import { Container } from "inversify";
import { IUsersRepository } from "../core/repositories/IUsersRepository";
import { UsersRepository } from "../infra/repositories/UsersRepository";
import { TYPES } from "../types";

export const container = new Container();

container.bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository);
