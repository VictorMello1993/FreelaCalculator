import { CreateUserInputModel } from "../dtos/users/CreateUserInputModel";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(data: CreateUserInputModel): User;
  findByEmail(email: string): User;
}
