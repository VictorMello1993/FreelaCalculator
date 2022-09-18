import { TokenModel } from "../../../../types/TokenModel";
import { AuthInputModel } from "../../../dtos/auth/auth";

export interface IAuthenticateUserUseCase {
  execute(data: AuthInputModel): Promise<TokenModel>;
}
