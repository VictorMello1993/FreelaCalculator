import { UpdateUserInputModel } from "../../../dtos/users/UpdateUserInputModel";
import { UserMap } from "../../../mappers/UserMap";

export interface IEditUserProfileUseCase {
  execute(data: UpdateUserInputModel): Promise<UserMap>;
}
