import { CreateUserRequest } from "../../models/user/requests/CreateUserRequest";
import { CreatedUserResponse } from "../../models/user/responses/CreatedUserReponse";

export default interface ICreateUserService {
    execute({name, email, password} : CreateUserRequest): Promise<CreatedUserResponse>;
}