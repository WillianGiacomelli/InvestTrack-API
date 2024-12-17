import { CreatedUserResponse } from "./CreatedUserReponse";

export class AuthUserResponse extends CreatedUserResponse {
    token: string;
}