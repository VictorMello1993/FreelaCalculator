import { EditJobInputModel } from "./../../core/dtos/jobs/EditJobInputModel";
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
import { CreateJobInputModel } from "../../core/dtos/jobs/CreateJobInputModel";
import { Job } from "../../core/entities/Job";
import { CreateJobUseCase } from "../../core/useCases/jobs/createJob/CreateJobUseCase";
import { TYPES } from "../../types";
import { EditJobUseCase } from "../../core/useCases/jobs/editJob/EditJobUseCase";
import { ValidateDTOMiddleware } from "../middlewares/ValidateDTOMiddleware";
import { EnsureAuthenticatedDTOMiddleware } from "../middlewares/EnsureAuthenticatedDTOMiddleware";
import { AuthInputModel } from "../../core/dtos/auth/auth";

@controller("/jobs")
export class JobsController extends BaseHttpController implements interfaces.Controller {
  private readonly _createJobUseCase: CreateJobUseCase;
  private readonly _editJobUseCase: EditJobUseCase;

  constructor(
    @inject(TYPES.CreateJobUseCase)
    createJobUseCase: CreateJobUseCase,
    @inject(TYPES.EditJobUseCase)
    editJobUseCase: EditJobUseCase,
  ) {
    super();
    this._createJobUseCase = createJobUseCase;
    this._editJobUseCase = editJobUseCase;
  }

  @httpPost(
    "/",
    EnsureAuthenticatedDTOMiddleware(AuthInputModel.Headers, "headers"),
    ValidateDTOMiddleware(CreateJobInputModel.Body, "body"),
  )
  async create(@requestBody() body: CreateJobInputModel.Body) {
    const result: Job = this._createJobUseCase.execute(body);
    return this.json(result);
  }

  @httpPut(
    "/:id",
    ValidateDTOMiddleware(EditJobInputModel.Body, "body"),
    ValidateDTOMiddleware(EditJobInputModel.Params, "params"),
  )
  async update(@requestBody() body: EditJobInputModel.Body, @requestParam("id") params: EditJobInputModel.Params) {
    const result: Job = this._editJobUseCase.execute(
      {
        name: body.name,
        DailyHours: body.DailyHours,
        TotalHours: body.TotalHours,
      },
      { id: params.toString() },
    );

    return this.json(result);
  }
}
