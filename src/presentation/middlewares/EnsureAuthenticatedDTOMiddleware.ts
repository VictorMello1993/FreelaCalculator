import { plainToInstance } from "class-transformer";
import { verify } from "jsonwebtoken";
import { getSubjectByToken } from "../../utils/auth.helpers";

export const EnsureAuthenticatedDTOMiddleware = (model: any, httpContext: string) => {
  return async (req: any, res: any, next: any) => {
    try {
      const output: any = plainToInstance(model, req[httpContext]);

      const { authorization } = output;

      if (!authorization) {
        return res.status(401).json({ messages: "Token missing" });
      }

      const [, token] = authorization.split(" ");

      if (!verify(token, process.env.SECRET_KEY)) {
        return res.status(401).json({ messages: "Invalid token" });
      }

      const subject = getSubjectByToken(token);

      req.user = { id: subject };

      return next();
    } catch (error) {
      return res.status(401).json({ messages: error.message });
    }
  };
};
