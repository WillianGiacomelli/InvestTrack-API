import { sign } from "jsonwebtoken";
import prisma from "../../database";
import AuthUserRequest from "../../models/user/requests/AuthUserRequest";
import { compareHash } from "../../utils/hashProvider";
import { AuthUserResponse } from "../../models/user/responses/AuthUserResponse";

class AuthUserService{
    async execute({email, password}: AuthUserRequest) : Promise<AuthUserResponse> {

        if(!email || !password){
            throw new Error("Missing parameters");
        }

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            throw new Error("User not found");
        }

        const passwordMatch = await compareHash(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }
        
        const token = sign(
        {
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET as string,
        {
            subject: user.id.toString(),
            expiresIn: "30d"
        });

        const response = new AuthUserResponse();

        response.id = user.id;
        response.name = user.name;
        response.email = user.email;
        response.token = token;

        return response;
    }
}

export default AuthUserService;