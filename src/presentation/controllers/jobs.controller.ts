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
import { Job } from "../../core/entities/Job";
import { CreateJobUseCase } from "../../core/useCases/jobs/createJob/CreateJobUseCase";
import { TYPES } from "../../types";
import { EditJobUseCase } from "../../core/useCases/jobs/editJob/EditJobUseCase";
import { ValidateDTOMiddleware } from "../middlewares/ValidateDTOMiddleware";
import { EnsureAuthenticatedDTOMiddleware } from "../middlewares/EnsureAuthenticatedDTOMiddleware";

import { DeleteJobUseCase } from "../../core/useCases/jobs/deleteJob/DeleteJobUseCase";

import { AuthRequestDTO } from "../dtos/auth/AuthRequestDTO";
import { CreateJobRequestDTO } from "../dtos/jobs/CreateJobRequestDTO";
import { EditJobRequestDTO } from "../dtos/jobs/EditJobRequestDTO";
import { DeleteJobRequestDTO } from "../dtos/jobs/DeleteJobRequestDTO";

@controller("/jobs")
export class JobsController extends BaseHttpController implements interfaces.Controller {
  private readonly _createJobUseCase: CreateJobUseCase;
  private readonly _editJobUseCase: EditJobUseCase;
  private readonly _deleteJobUseCase: DeleteJobUseCase;

  constructor(
    @inject(TYPES.CreateJobUseCase)
    createJobUseCase: CreateJobUseCase,
    @inject(TYPES.EditJobUseCase)
    editJobUseCase: EditJobUseCase,
    @inject(TYPES.DeleteJobUseCase)
    deleteJobUseCase: DeleteJobUseCase,
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

    const result: Job = this._createJobUseCase.execute({ name, DailyHours, TotalHours, UserId: id });
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

    const result: Job = this._editJobUseCase.execute({
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
  delete(@requestParam("id") params: string) {
    this._deleteJobUseCase.execute(params);
  }
}
