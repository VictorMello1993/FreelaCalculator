import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  httpPut,
  interfaces,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { UpdateUserInputModel } from "../../core/dtos/users/UpdateUserInputModel";
import { User } from "../../core/entities/User";
import { CreateUserUseCase } from "../../core/useCases/users/createUser/CreateUserUseCase";
import { EditUserProfileUseCase } from "../../core/useCases/users/editUser/EditUserProfileUseCase";
import { TYPES } from "../../types";

@controller("/users")
export class UsersController extends BaseHttpController implements interfaces.Controller {
  private readonly _createUserUseCase: CreateUserUseCase;
  private readonly _editUserProfileUseCase: EditUserProfileUseCase;

  constructor(
    @inject(TYPES.CreateUserUseCase)
    createUserUseCase: CreateUserUseCase,
    @inject(TYPES.EditUserProfileUseCase)
    updateUserUseCase: EditUserProfileUseCase,
  ) {
    super();
    this._createUserUseCase = createUserUseCase;
    this._editUserProfileUseCase = updateUserUseCase;
  }

  @httpPost("/")
  async create(@requestBody() body: CreateUserInputModel): Promise<interfaces.IHttpActionResult> {
    const result: User = this._createUserUseCase.execute(body);
    return this.json(result);
  }

  @httpPut("/:id")
  async update(
    @requestParam("id") params: string,
    @requestBody() body: UpdateUserInputModel,
  ): Promise<interfaces.IHttpActionResult> {
    const result = this._editUserProfileUseCase.execute({
      id: params,
      name: body.name,
      email: body.email,
      MonthlyBudget: body.MonthlyBudget,
      VacationPerYear: body.VacationPerYear,
      DaysPerWeek: body.DaysPerWeek,
      HoursPerDay: body.HoursPerDay,
    });

    return this.json(result);
  }
}
