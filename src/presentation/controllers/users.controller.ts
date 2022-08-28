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
import { AuthInputModel } from "../../core/dtos/auth/auth";

import { CreateUserInputModel } from "../../core/dtos/users/CreateUserInputModel";
import { InactivateUserInputModel } from "../../core/dtos/users/InactivateUserInputModel";
import { UpdateUserInputModel } from "../../core/dtos/users/UpdateUserInputModel";
import { User } from "../../core/entities/User";
import { AuthenticateUserUseCase } from "../../core/useCases/users/auth/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../core/useCases/users/createUser/CreateUserUseCase";
import { InactivateUserUseCase } from "../../core/useCases/users/deleteUser/InactivateUserUseCase";
import { EditUserProfileUseCase } from "../../core/useCases/users/editUser/EditUserProfileUseCase";
import { TYPES } from "../../types";
import { ValidateDTOMiddleware } from "../middlewares/ValidateDTOMiddleware";

@controller("/users")
export class UsersController extends BaseHttpController implements interfaces.Controller {
  private readonly _createUserUseCase: CreateUserUseCase;
  private readonly _editUserProfileUseCase: EditUserProfileUseCase;
  private readonly _inactivateUserUseCase: InactivateUserUseCase;
  private readonly _authenticateUserUseCase: AuthenticateUserUseCase;

  constructor(
    @inject(TYPES.CreateUserUseCase)
    createUserUseCase: CreateUserUseCase,
    @inject(TYPES.EditUserProfileUseCase)
    updateUserUseCase: EditUserProfileUseCase,
    @inject(TYPES.InactivateUserUseCase)
    inactivateUserUseCase: InactivateUserUseCase,
    @inject(TYPES.AuthenticateUserUseCase)
    authenticateUserUseCase: AuthenticateUserUseCase,
  ) {
    super();
    this._createUserUseCase = createUserUseCase;
    this._editUserProfileUseCase = updateUserUseCase;
    this._inactivateUserUseCase = inactivateUserUseCase;
    this._authenticateUserUseCase = authenticateUserUseCase;
  }

  @httpPost("/", ValidateDTOMiddleware(CreateUserInputModel.Body, "body"))
  async create(@requestBody() body: CreateUserInputModel.Body): Promise<interfaces.IHttpActionResult> {
    const result: User = await this._createUserUseCase.execute(body);
    return this.json(result);
  }

  @httpPut("/:id")
  async update(
    @requestParam("id") params: UpdateUserInputModel.Params,
    @requestBody() body: UpdateUserInputModel.Body,
  ): Promise<interfaces.IHttpActionResult> {
    const result = this._editUserProfileUseCase.execute(
      {
        name: body.name,
        email: body.email,
        MonthlyBudget: body.MonthlyBudget,
        VacationPerYear: body.VacationPerYear,
        DaysPerWeek: body.DaysPerWeek,
        HoursPerDay: body.HoursPerDay,
      },
      { id: params.toString() },
    );

    return this.json(result);
  }

  @httpDelete("/:id", ValidateDTOMiddleware(InactivateUserInputModel.Params, "params"))
  async delete(@requestParam("id") params: string): Promise<void> {
    const result = this._inactivateUserUseCase.execute(params);
    this.json(result);
  }

  @httpPost("/login", ValidateDTOMiddleware(AuthInputModel.Body, "body"))
  async auth(@requestBody() body: AuthInputModel.Body) {
    const token = await this._authenticateUserUseCase.execute(body);
    return this.json(token);
  }
}
