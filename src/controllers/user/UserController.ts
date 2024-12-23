import { Request, Response } from 'express';
import CreateUserService from '../../services/user/CreateUserService';
import AuthUserService from '../../services/user/AuthUserService';
import { ApiResponse } from '../../models/base/Response';

const createUser = async (req: Request, res: Response) => {
    try{
        const {name, cpf, birthDate, email, password} = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, cpf, birthDate, email, password});
        
        return res.status(201).json(ApiResponse.success("", [user]));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

const authUser = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({email,password});

        return res.status(200).json({error: false, message: "", auth});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export { createUser, authUser };