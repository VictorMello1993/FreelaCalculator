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

  @httpPost("/")
  async create(@requestBody() body: CreateJobInputModel) {
    const result: Job = this._createJobUseCase.execute(body);
    return this.json(result);
  }

  @httpPut("/:id")
  async update(@requestBody() body: EditJobInputModel, @requestParam("id") params: string) {
    const result: Job = this._editJobUseCase.execute({
      id: params,
      name: body.name,
      DailyHours: body.DailyHours,
      TotalHours: body.TotalHours,
    });

    return this.json(result);
  }
}
