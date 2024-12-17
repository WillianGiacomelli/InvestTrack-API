import { sign } from "jsonwebtoken";
import prisma from "../../database";
import AuthUserRequest from "../../models/user/requests/AuthUserRequest";
import { compareHash } from "../../utils/hashProvider";
import { AuthUserResponse } from "../../models/user/responses/user/AuthUserResponse";

class AuthUserService{
    async execute({email, password}: AuthUserRequest) : Promise<AuthUserResponse> {

        email = email.trim();
        password = password.trim();

        if(!email || !password){
            throw new Error("Missing parameters");
        }

        const userLogin = await prisma.login.findFirst({
            where:{
                email: email
            }
        })


        if(!userLogin){
            throw new Error("Email/Senha incorretos");
        }

        const passwordMatch = await compareHash(password, userLogin.password);

        if(!passwordMatch){
            throw new Error("Email/Senha incorretos");
        }

        const user = await prisma.user.findUnique({
            where:{
                id: userLogin.userId
            }
        })
        
        const token = sign(
        {
            name: user.name,
            email: userLogin.email,
            id: user.id
        },
        process.env.JWT_SECRET as string,
        {
            subject: user.id.toString(),
            expiresIn: "30d"
        });

        const response = new AuthUserResponse();

        response.id = user.id;
        response.name = user.name;
        response.email = userLogin.email;
        response.token = token;

        return response;
    }
}

export default AuthUserService;