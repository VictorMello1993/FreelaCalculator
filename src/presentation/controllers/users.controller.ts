import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, interfaces, requestBody } from "inversify-express-utils";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { User } from "../../core/entities/User";
import { CreateUserUseCase } from "../../core/useCases/users/createUser/CreateUserUseCase";
import { TYPES } from "../../types";

@controller("/users")
export class UsersController extends BaseHttpController implements interfaces.Controller {
  private _createUserUseCase: CreateUserUseCase;

  constructor(
    @inject(TYPES.CreateUserUseCase)
    createUserUseCase: CreateUserUseCase,
  ) {
    super();
    this._createUserUseCase = createUserUseCase;
  }

  @httpPost("/")
  async create(@requestBody() body: CreateUserInputModel): Promise<interfaces.IHttpActionResult> {
    const result: User = this._createUserUseCase.execute(body);
    return this.json(result);
  }
}
