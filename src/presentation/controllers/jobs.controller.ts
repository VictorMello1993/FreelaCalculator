import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpPost,
  httpPut,
  interfaces,
  request,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../../types";
import { ValidateDTOMiddleware } from "../middlewares/ValidateDTOMiddleware";
import { EnsureAuthenticatedDTOMiddleware } from "../middlewares/EnsureAuthenticatedDTOMiddleware";
import { AuthRequestDTO } from "../dtos/auth/AuthRequestDTO";
import { CreateJobRequestDTO } from "../dtos/jobs/CreateJobRequestDTO";
import { EditJobRequestDTO } from "../dtos/jobs/EditJobRequestDTO";
import { DeleteJobRequestDTO } from "../dtos/jobs/DeleteJobRequestDTO";
import { ICreateJobUseCase } from "../../core/useCases/jobs/createJob/ICreateJobUseCase";
import { IDeleteJobUseCase } from "../../core/useCases/jobs/deleteJob/IDeleteJobUseCase";
import { IEditJobUseCase } from "../../core/useCases/jobs/editJob/IEditJobUseCase";

@controller("/jobs")
export class JobsController extends BaseHttpController implements interfaces.Controller {
  private readonly _createJobUseCase: ICreateJobUseCase;
  private readonly _editJobUseCase: IEditJobUseCase;
  private readonly _deleteJobUseCase: IDeleteJobUseCase;

  constructor(
    @inject(TYPES.ICreateJobUseCase)
    createJobUseCase: ICreateJobUseCase,
    @inject(TYPES.IEditJobUseCase)
    editJobUseCase: IEditJobUseCase,
    @inject(TYPES.IDeleteJobUseCase)
    deleteJobUseCase: IDeleteJobUseCase,
  ) {
    super();
    this._createJobUseCase = createJobUseCase;
    this._editJobUseCase = editJobUseCase;
    this._deleteJobUseCase = deleteJobUseCase;
  }

  @httpPost(
    "/",
    EnsureAuthenticatedDTOMiddleware(AuthRequestDTO.Headers, "headers"),
    ValidateDTOMiddleware(CreateJobRequestDTO.Body, "body"),
  )
  async create(@requestBody() body: CreateJobRequestDTO.Body, @request() req: CreateJobRequestDTO.Request) {
    const { id } = req.user;
    const { name, DailyHours, TotalHours } = body;

    const result = await this._createJobUseCase.execute({ name, DailyHours, TotalHours, UserId: id });
    return this.json(result);
  }

  @httpPut(
    "/:id",
    EnsureAuthenticatedDTOMiddleware(AuthRequestDTO.Headers, "headers"),
    ValidateDTOMiddleware(EditJobRequestDTO.Body, "body"),
    ValidateDTOMiddleware(EditJobRequestDTO.Params, "params"),
  )
  async update(
    @requestBody() body: EditJobRequestDTO.Body,
    @requestParam("id") params: EditJobRequestDTO.Params,
    @request() req: EditJobRequestDTO.Request,
  ) {
    const { name, DailyHours, TotalHours } = body;
    const { id } = req.user;

    const result = await this._editJobUseCase.execute({
      id: params.toString(),
      name,
      DailyHours,
      TotalHours,
      UserId: id,
    });

    return this.json(result);
  }

  @httpDelete(
    "/:id",
    EnsureAuthenticatedDTOMiddleware(AuthRequestDTO.Headers, "headers"),
    ValidateDTOMiddleware(DeleteJobRequestDTO.Params, "params"),
  )
  async delete(@requestParam("id") params: string) {
    await this._deleteJobUseCase.execute(params);
  }
}
