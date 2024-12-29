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

        const auth = await authUserService.authUser({email,password});

        return res.status(200).json({error: false, message: "", auth});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const resetPasswordRequest = async (req: Request, res: Response) => {
    try{
        const {email} = req.body;
        console.log(email);
        const authUserService = new AuthUserService();

        await authUserService.resetPasswordRequest(email);

        return res.status(200).json({error: false, message: "Email enviado com sucesso"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try{
        const {password, token} = req.body;

        const authUserService = new AuthUserService();

        await authUserService.resetPassword({password, token});

        return res.status(200).json({error: false, message: "Senha alterada com sucesso"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export { createUser, authUser, resetPassword, resetPasswordRequest };