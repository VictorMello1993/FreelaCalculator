import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, interfaces } from "inversify-express-utils";
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

  @httpGet("/")
  async handle(): Promise<interfaces.IHttpActionResult> {
    console.log("teste");

    const result: any[] = this._usersService.execute();

    return this.json(result);
  }
}
