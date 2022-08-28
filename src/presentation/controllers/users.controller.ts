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
import { AuthenticateUserUseCase } from "../../core/useCases/users/auth/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../core/useCases/users/createUser/CreateUserUseCase";
import { InactivateUserUseCase } from "../../core/useCases/users/deleteUser/InactivateUserUseCase";
import { EditUserProfileUseCase } from "../../core/useCases/users/editUser/EditUserProfileUseCase";
import { TYPES } from "../../types";
import { CreateUserRequest } from "../dtos/users/CreateUserRequest";
import { InactivateUserRequest } from "../dtos/users/InactivateUserRequest";
import { UpdateUserProfileRequest } from "../dtos/users/UpdateUserProfileRequest";
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

  @httpPost("/", ValidateDTOMiddleware(CreateUserRequest.Body, "body"))
  async create(@requestBody() body: CreateUserRequest.Body): Promise<interfaces.IHttpActionResult> {
    const result = await this._createUserUseCase.execute(body);

    return this.json(result);
  }

  @httpPut("/:id")
  async update(
    @requestParam("id") params: UpdateUserProfileRequest.Params,
    @requestBody() body: UpdateUserProfileRequest.Body,
  ): Promise<interfaces.IHttpActionResult> {
    const result = await this._editUserProfileUseCase.execute({
      id: params.toString(),
      name: body.name,
      email: body.email,
      MonthlyBudget: body.MonthlyBudget,
      VacationPerYear: body.VacationPerYear,
      DaysPerWeek: body.DaysPerWeek,
      HoursPerDay: body.HoursPerDay,
    });

    return this.json(result);
  }

  @httpDelete("/:id", ValidateDTOMiddleware(InactivateUserRequest.Params, "params"))
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
