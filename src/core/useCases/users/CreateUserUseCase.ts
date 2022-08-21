import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { CreateUserInputModel } from "../../dtos/users/CreateUserInputModel";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) { }

  execute(data: CreateUserInputModel): User {
    const user = this.usersRepository.findByEmail(data.email);

    if (user) {
      throw new Error("User already exists");
    }

    const newUser = this.usersRepository.create(data);

    return newUser;
  }
}
