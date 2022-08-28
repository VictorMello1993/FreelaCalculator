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
import { IAuthenticateUserUseCase } from "../../core/useCases/users/auth/IAuthenticateUserUseCase";
import { ICreateUserUseCase } from "../../core/useCases/users/createUser/ICreateUserUseCase";
import { IInactivateUserUseCase } from "../../core/useCases/users/deleteUser/IInactivateUserUseCase";
import { IEditUserProfileUseCase } from "../../core/useCases/users/editUser/IEditUserProfileUseCase";
import { TYPES } from "../../types";
import { AuthRequestDTO } from "../dtos/auth/AuthRequestDTO";
import { CreateUserRequestDTO } from "../dtos/users/CreateUserRequestDTO";
import { InactivateUserRequestDTO } from "../dtos/users/InactivateUserRequestDTO";
import { UpdateUserProfileRequestDTO } from "../dtos/users/UpdateUserProfileRequestDTO";
import { ValidateDTOMiddleware } from "../middlewares/ValidateDTOMiddleware";

@controller("/users")
export class UsersController extends BaseHttpController implements interfaces.Controller {
  private readonly _createUserUseCase: ICreateUserUseCase;
  private readonly _editUserProfileUseCase: IEditUserProfileUseCase;
  private readonly _inactivateUserUseCase: IInactivateUserUseCase;
  private readonly _authenticateUserUseCase: IAuthenticateUserUseCase;

  constructor(
    @inject(TYPES.ICreateUserUseCase)
    createUserUseCase: ICreateUserUseCase,
    @inject(TYPES.IEditUserProfileUseCase)
    updateUserUseCase: IEditUserProfileUseCase,
    @inject(TYPES.IInactivateUserUseCase)
    inactivateUserUseCase: IInactivateUserUseCase,
    @inject(TYPES.IAuthenticateUserUseCase)
    authenticateUserUseCase: IAuthenticateUserUseCase,
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
