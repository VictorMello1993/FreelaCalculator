import { inject, injectable } from "inversify";
import { TYPES } from "../../../../types";
import { UserMap } from "../../../mappers/UserMap";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IGetUserByIdUseCase } from "./IGetUserByIdUseCase";

@injectable()
export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  private readonly _usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.IUsersRepository)
    private usersRepository: IUsersRepository,
  ) {
    this._usersRepository = usersRepository;
  }

  execute(id: string) {
    const user = this._usersRepository.findById(id);
    const userDTO = user ? UserMap.toDTO(user) : null;

    return userDTO;
  }
}
