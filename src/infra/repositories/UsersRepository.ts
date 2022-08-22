import { injectable } from "inversify";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { User } from "../../core/entities/User";
import { IUsersRepository } from "../../core/repositories/IUsersRepository";
import { users } from "../database/db";

@injectable()
export class UsersRepository implements IUsersRepository {
  create(data: CreateUserInputModel): User {
    const newUser = new User();

    newUser.name = data.name;
    newUser.email = data.email;
    newUser.password = data.password;

    users.push(newUser);

    return newUser;
  }

  findByEmail(email: string): User {
    return users.find((user) => user.email === email);
  }
}
