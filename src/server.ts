import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import "./presentation/controllers/app.controller";
import "./presentation/controllers/users.controller";
import { container } from "./container";
import { AppError } from "./errors/AppError";

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

      // Middleware de erros
      app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError) {
          console.log("testeeee", error);
          return response.status(error.statusCode).json({ message: error.message });
        }

        return response.status(500).json({ status: "error", message: "Interval server error" });
      });
    });

    const app = server.build();

    app.listen(port, () => console.log(`Server is running at ${url}${port}`));
  }
}

export default new App();
