import { BaseHttpController, httpGet, interfaces, controller } from "inversify-express-utils";

@controller("/")
export class AppController extends BaseHttpController implements interfaces.Controller {
  constructor() {
    super();
  }

  @httpGet("/")
  public handle(): interfaces.IHttpActionResult {
    return this.json({ message: "Service is running properly!" });
  }
}
