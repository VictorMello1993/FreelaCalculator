import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { UserMap } from "../../../mappers/UserMap";

export interface ICreateUserUseCase {
  execute(data: CreateUserInputModel): Promise<UserMap>;
}
