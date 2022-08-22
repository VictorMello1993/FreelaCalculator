import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import "./presentation/controllers/app.controller";
import "./presentation/controllers/users.controller";
import { container } from "./container";

const server: InversifyExpressServer = new InversifyExpressServer(container);

const app = server.build();

server.setConfig((app) => {
  app.use(express.json());
});

export { app };
