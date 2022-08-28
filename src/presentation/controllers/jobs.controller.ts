import { EditJobInputModel } from "./../../core/dtos/jobs/EditJobInputModel";
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
import { CreateJobInputModel } from "../../core/dtos/jobs/CreateJobInputModel";
import { Job } from "../../core/entities/Job";
import { CreateJobUseCase } from "../../core/useCases/jobs/createJob/CreateJobUseCase";
import { TYPES } from "../../types";
import { EditJobUseCase } from "../../core/useCases/jobs/editJob/EditJobUseCase";
import { ValidateDTOMiddleware } from "../middlewares/ValidateDTOMiddleware";
import { EnsureAuthenticatedDTOMiddleware } from "../middlewares/EnsureAuthenticatedDTOMiddleware";
import { AuthInputModel } from "../../core/dtos/auth/auth";
import { DeleteJobUseCase } from "../../core/useCases/jobs/deleteJob/DeleteJobUseCase";
import { DeleteJobInputModel } from "../../core/dtos/jobs/DeleteJobInputModel";

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
    EnsureAuthenticatedDTOMiddleware(AuthInputModel.Headers, "headers"),
    ValidateDTOMiddleware(CreateJobInputModel.Body, "body"),
  )
  async create(@requestBody() body: CreateJobInputModel.Body, @request() req: CreateJobInputModel.Request) {
    const { id } = req.user;
    const { name, DailyHours, TotalHours } = body;

    const result: Job = this._createJobUseCase.execute({ name, DailyHours, TotalHours, UserId: id });
    return this.json(result);
  }

  @httpPut(
    "/:id",
    EnsureAuthenticatedDTOMiddleware(AuthInputModel.Headers, "headers"),
    ValidateDTOMiddleware(EditJobInputModel.Body, "body"),
    ValidateDTOMiddleware(EditJobInputModel.Params, "params"),
  )
  async update(
    @requestBody() body: EditJobInputModel.Body,
    @requestParam("id") params: EditJobInputModel.Params,
    @request() req: EditJobInputModel.Request,
  ) {
    const { name, DailyHours, TotalHours } = body;
    const { id } = req.user;

    const result: Job = this._editJobUseCase.execute(
      {
        name,
        DailyHours,
        TotalHours,
        UserId: id,
      },
      { id: params.toString() },
    );

    return this.json(result);
  }

  @httpDelete(
    "/:id",
    EnsureAuthenticatedDTOMiddleware(AuthInputModel.Headers, "headers"),
    ValidateDTOMiddleware(DeleteJobInputModel.Params, "params"),
  )
  delete(@requestParam("id") params: string) {
    this._deleteJobUseCase.execute(params);
  }
}
