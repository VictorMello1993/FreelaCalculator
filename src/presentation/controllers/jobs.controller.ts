import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, interfaces, requestBody } from "inversify-express-utils";
import { CreateJobInputModel } from "../../core/dtos/jobs/CreateJobInputModel";
import { Job } from "../../core/entities/Job";
import { CreateJobUseCase } from "../../core/useCases/jobs/createJob/CreateJobUseCase";
import { TYPES } from "../../types";

@controller("/jobs")
export class JobsController extends BaseHttpController implements interfaces.Controller {
  private _createJobUseCase: CreateJobUseCase;

  constructor(
    @inject(TYPES.CreateJobUseCase)
    createJobUseCase: CreateJobUseCase,
  ) {
    super();
    this._createJobUseCase = createJobUseCase;
  }

  @httpPost("/")
  async create(@requestBody() body: CreateJobInputModel) {
    const result: Job = this._createJobUseCase.execute(body);
    return this.json(result);
  }
}
