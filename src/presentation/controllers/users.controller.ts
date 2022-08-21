import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, interfaces, requestBody } from "inversify-express-utils";
import { container } from "../../container";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { IUsersRepository } from "../../core/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../core/useCases/users/CreateUserUseCase";
import { TYPES } from "../../types";

@controller("/users")
export class UsersController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.IUsersRepository) createUserUseCase: IUsersRepository) {
    super();
  }

  @httpPost("/")
  createUser(@requestBody() body: CreateUserInputModel): interfaces.IHttpActionResult {
    console.log(body);

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const result = createUserUseCase.execute(body);
    return this.json({
      message: "success",
      data: { result },
    });
  }
}
