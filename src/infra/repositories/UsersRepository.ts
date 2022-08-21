import { injectable } from "inversify";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { User } from "../../core/entities/User";
import { IUsersRepository } from "../../core/repositories/IUsersRepository";
import { Database } from "../database/db";

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private db: Database) {
    db.users = [];
  }

  create(data: CreateUserInputModel): User {
    const newUser = new User();

    newUser.name = data.name;
    newUser.email = data.email;
    newUser.password = data.password;

    this.db.users.push(newUser);

    return newUser;
  }

  findByEmail(email: string): User {
    return this.db.users.find((user) => user.email === email);
  }
}
