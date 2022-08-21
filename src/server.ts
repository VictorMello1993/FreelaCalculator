import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import "./presentation/controllers/app.controller";

const port = process.env.PORT;
const container = new Container();

export class App {
  constructor() {
    this.createService();
  }

  createService() {
    // Configurando o serviço de health check
    const server: InversifyExpressServer = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.json());
    });

    // Rodando o servidor
    const app = server.build();

    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  }
}

export default new App();
