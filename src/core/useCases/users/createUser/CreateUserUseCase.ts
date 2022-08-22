import { injectable } from "inversify";
import { CreateUserInputModel } from "../../../dtos/users/CreateUserInputModel";
import { User } from "../../../entities/User";
import { CreateUserInterface } from "./CreateUserInterface";

@injectable()
export class CreateUserUseCase implements CreateUserInterface {
  execute(data: CreateUserInputModel): User[] {
    return [
      {
        id: "1",
        name: "Victor",
        email: "test1@gmail.com",
        password: "123",
      },
    ];
  }
}
