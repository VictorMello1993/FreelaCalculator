import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { User } from "../../../entities/User";

export interface CreateUserInterface {
  execute(data: CreateUserInputModel): User;
}
