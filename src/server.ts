import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import "./presentation/controllers/app.controller";
import "./presentation/controllers/users.controller";
import { container } from "./container";

export class App {
  constructor() {
    this.createService();
  }

  createService(): void {
    const port = process.env.PORT;
    const url = process.env.API_URL;

    const server: InversifyExpressServer = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.json());
    });

    const app = server.build();

    app.listen(port, () => console.log(`Server is running at ${url}${port}`));
  }
}

export default new App();
