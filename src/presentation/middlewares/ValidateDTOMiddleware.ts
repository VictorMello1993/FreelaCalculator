import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export const ValidateDTOMiddleware = (model: any, httpContext: string) => {
  return async (req: any, res: any, next: any) => {
    const output: any = plainToInstance(model, req[httpContext]);

    const validationResult: ValidationError[] = await validate(output, {});

    if (validationResult.length > 0) {
      const messages = validationResult.map((error: ValidationError) => {
        return Object.values(error.constraints).join(", ");
      });

      return res.status(400).json({ messages });
    }

    return next();
  };
};
