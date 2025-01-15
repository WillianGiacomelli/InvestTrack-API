import prisma from "../../database";
import { CreateUserRequest } from "../../models/user/requests/CreateUserRequest";
import ICreateUserService from "../interfaces/ICreateUserService";
import { generateHash } from "../../utils/hashProvider";
import { CreatedUserResponse } from "../../models/user/responses/user/CreatedUserReponse";
import moment from 'moment';


class CreateUserService implements ICreateUserService  {
    async execute({name, cpf, birthDate, email, password}: CreateUserRequest): Promise<CreatedUserResponse> {
        
        if(!name || !email || !password || !cpf || !birthDate){
            throw new Error("Estão faltando informações");
        }

        const userCPFExists = await prisma.user.findUnique({
            where:{
                cpf
            }
        })


        if(userCPFExists){
            throw new Error("Já existe um usuário com este cpf ou email");
        }

        const passwordHashed = await generateHash(password);

        
        const datetimeString = moment({
            year: birthDate.year,
            month: birthDate.month - 1,
            day: birthDate.day,
          }).startOf('day').format('YYYY-MM-DD HH:mm:ss');

        const datetime = new Date(datetimeString);

        const user = await prisma.user.create({
            data:{
                name,
                cpf,
                birthDate: datetime
            }
        });

        const login = await prisma.login.create({
            data:{
                email: email,
                password: passwordHashed,
                userId: user.id
            }
        })
        
        const userCreated = {
            ...user,
            email: login.email
        }

        return userCreated;
    }
}

export default CreateUserService;