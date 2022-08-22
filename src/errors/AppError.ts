interface IErrorHandler {
  name: string;
  statusCode: number;
  message: string;
  description: string;
}

export class AppError extends Error {
  statusCode: number;
  description: string;

  constructor({ name, statusCode = 400, message, description }: IErrorHandler) {
    super(message);

    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
  }
}
