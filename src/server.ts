import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import "./presentation/controllers/app.controller";
import "./presentation/controllers/users.controller";
import "./presentation/controllers/jobs.controller";
import { container } from "./container";
import { AppError } from "./errors/AppError";

export class App {
  constructor() {
    this.createService();
  }

  async createService(): Promise<void> {
    const port = process.env.PORT;
    const url = process.env.API_URL;

    const server: InversifyExpressServer = new InversifyExpressServer(container);

    await server.setConfig((app) => {
      app.use(express.json());
    });

    await server.setErrorConfig((app) => {
      app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError) {
          return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
        }

        return response.status(500).json({ status: 500, message: "Interval server error" });
      });
    });

    const app = await server.build();

    app.listen(port, () => console.log(`Server is running at ${url}${port}`));
  }
}

export default new App();
