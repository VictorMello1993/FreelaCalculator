import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, interfaces, requestBody } from "inversify-express-utils";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { User } from "../../core/entities/User";
import { CreateUserInterface } from "../../core/useCases/users/createUser/CreateUserInterface";
import { TYPES } from "../../types";

@controller("/users")
export class UsersController extends BaseHttpController implements interfaces.Controller {
  private _usersService: CreateUserInterface;

  constructor(
    @inject(TYPES.CreateUserInterface)
    createUserUseCase: CreateUserInterface,
  ) {
    super();
    this._usersService = createUserUseCase;
  }

  @httpPost("/")
  async create(
    @requestBody()
    body: CreateUserInputModel,
  ): Promise<interfaces.IHttpActionResult> {
    console.log(body);
    const result: User[] = this._usersService.execute(body);

    return this.json(result);
  }
}
