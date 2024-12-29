import AuthUserRequest from "../../models/user/requests/AuthUserRequest";
import { AuthUserResponse } from "../../models/user/responses/user/AuthUserResponse";

export default interface ICreateUserService {
    authUser({email, password} : AuthUserRequest): Promise<AuthUserResponse>;
}