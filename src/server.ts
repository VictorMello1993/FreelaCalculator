import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import "./presentation/controllers/app.controller";
import "./presentation/controllers/users.controller";
import "./presentation/controllers/jobs.controller";
import { container } from "./container";
import { AppError } from "./errors/AppError";
import mongoose from "mongoose";

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

    server.setErrorConfig((app) => {
      app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError) {
          return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
        }

        return response.status(500).json({ status: 500, message: "Interval server error" });
      });
    });

    const app = server.build();

    mongoose
      .connect(process.env.MONGO_DB_URL, {
        dbName: process.env.MONGO_DB_DATABASE,
        user: process.env.MONGO_DB_USER,
        pass: process.env.MONGO_DB_PASSWORD,
      })
      .then(() => {
        console.log("MongoDB connected successfully!");

        const userSchema = new mongoose.Schema({
          name: { type: String },
          age: { type: Number },
        });

        const commentSchema = new mongoose.Schema({
          message: { type: String },
        });

        const User = mongoose.model("User", userSchema);
        const Comments = mongoose.model("Comment", commentSchema);

        const fulano = new User({ name: "Fulano", age: 28 });
        const firstComment = new Comments({ message: "Olá mundo" });

        fulano.save();
        firstComment.save();
      })
      .catch((err) => console.log(err));
    app.listen(port, () => console.log(`Server is running at ${url}${port}`));
  }
}

export default new App();
