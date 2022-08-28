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
import { AuthenticateUserUseCase } from "../../core/useCases/users/auth/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../core/useCases/users/createUser/CreateUserUseCase";
import { InactivateUserUseCase } from "../../core/useCases/users/deleteUser/InactivateUserUseCase";
import { EditUserProfileUseCase } from "../../core/useCases/users/editUser/EditUserProfileUseCase";
import { TYPES } from "../../types";
import { AuthRequestDTO } from "../dtos/auth/AuthRequestDTO";
import { CreateUserRequestDTO } from "../dtos/users/CreateUserRequestDTO";
import { InactivateUserRequestDTO } from "../dtos/users/InactivateUserRequestDTO";
import { UpdateUserProfileRequestDTO } from "../dtos/users/UpdateUserProfileRequestDTO";
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

  @httpPost("/", ValidateDTOMiddleware(CreateUserRequestDTO.Body, "body"))
  async create(@requestBody() body: CreateUserRequestDTO.Body): Promise<interfaces.IHttpActionResult> {
    const result = await this._createUserUseCase.execute(body);

    return this.json(result);
  }

  @httpPut("/:id")
  async update(
    @requestParam("id") params: UpdateUserProfileRequestDTO.Params,
    @requestBody() body: UpdateUserProfileRequestDTO.Body,
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

  @httpDelete("/:id", ValidateDTOMiddleware(InactivateUserRequestDTO.Params, "params"))
  async delete(@requestParam("id") params: string): Promise<void> {
    const result = this._inactivateUserUseCase.execute(params);
    this.json(result);
  }

  @httpPost("/login", ValidateDTOMiddleware(AuthRequestDTO.Body, "body"))
  async auth(@requestBody() body: AuthRequestDTO.Body) {
    const token = await this._authenticateUserUseCase.execute(body);
    return this.json(token);
  }
}
