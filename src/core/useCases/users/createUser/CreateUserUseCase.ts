import { injectable } from "inversify";
import { CreateUserInterface } from "./CreateUserInterface";

@injectable()
export class CreateUserUseCase implements CreateUserInterface {
  execute(): any[] {
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
