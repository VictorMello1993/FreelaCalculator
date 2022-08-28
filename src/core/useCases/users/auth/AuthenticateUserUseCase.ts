import { compare } from "bcrypt";
import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { TokenModel } from "../../../../types/TokenModel";
import { generateToken } from "../../../../utils/auth.helpers";
import { AuthInputModel } from "../../../dtos/auth/auth";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

@injectable()
export class AuthenticateUserUseCase {
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IUsersRepository)
    usersRepository: IUsersRepository,
  ) {
    this._usersRepository = usersRepository;
  }

  async execute({ email, password }: AuthInputModel.Body): Promise<TokenModel> {
    const user = this._usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User or password are invalid", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or password are invalid", 401);
    }

    const tokenModel = generateToken(user.id, user.email, user.name);

    return tokenModel;
  }
}
