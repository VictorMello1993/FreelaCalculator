import { inject } from "inversify";

import {
  BaseHttpController,
  controller,
  httpDelete,
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
import { InactivateUserUseCase } from "../../core/useCases/users/deleteUser/InactivateUserUseCase";
import { EditUserProfileUseCase } from "../../core/useCases/users/editUser/EditUserProfileUseCase";
import { TYPES } from "../../types";
import { ValidateDTOMiddleware } from "../middlewares/validateDTOMiddleware";

@controller("/users")
export class UsersController extends BaseHttpController implements interfaces.Controller {
  private readonly _createUserUseCase: CreateUserUseCase;
  private readonly _editUserProfileUseCase: EditUserProfileUseCase;
  private readonly _inactivateUserUseCase: InactivateUserUseCase;

  constructor(
    @inject(TYPES.CreateUserUseCase)
    createUserUseCase: CreateUserUseCase,
    @inject(TYPES.EditUserProfileUseCase)
    updateUserUseCase: EditUserProfileUseCase,
    @inject(TYPES.InactivateUserUseCase)
    inactivateUserUseCase: InactivateUserUseCase,
  ) {
    super();
    this._createUserUseCase = createUserUseCase;
    this._editUserProfileUseCase = updateUserUseCase;
    this._inactivateUserUseCase = inactivateUserUseCase;
  }

  @httpPost("/", ValidateDTOMiddleware(CreateUserInputModel, "body"))
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

  @httpDelete("/:id")
  async delete(@requestParam("id") params: string): Promise<void> {
    const result = this._inactivateUserUseCase.execute(params);
    this.json(result);
  }
}
