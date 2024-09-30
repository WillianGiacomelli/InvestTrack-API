import { hash } from "bcryptjs";
import prisma from "../../database";
import { CreateUserRequest } from "../../models/user/requests/CreateUserRequest";
import ICreateUserService from "../interfaces/ICreateUserService";
import { generateHash } from "../../utils/hashProvider";
import { CreatedUserResponse } from "../../models/user/responses/CreatedUserReponse";

class CreateUserService implements ICreateUserService{
    async execute({name, email, password}: CreateUserRequest): Promise<CreatedUserResponse> {
        
        if(!name || !email || !password){
            throw new Error("Missing parameters");
        }

        const userAlreadyExists = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const passwordHashed = await generateHash(password);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: passwordHashed
            }
        })

        return user;
    }
}

export default CreateUserService;