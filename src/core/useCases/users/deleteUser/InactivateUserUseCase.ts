import { inject, injectable } from "inversify";
import { AppError } from "../../../../errors/AppError";
import { TYPES } from "../../../../types";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IInactivateUserUseCase } from "./IInactivateUserUseCase";

@injectable()
export class InactivateUserUseCase implements IInactivateUserUseCase {
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IUsersRepository)
    usersRepository: IUsersRepository,
  ) {
    this._usersRepository = usersRepository;
  }

  async execute(id: string): Promise<void> {
    const user = await this._usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await this._usersRepository.inactivateUser(id);
  }
}
