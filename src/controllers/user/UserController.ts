import { Request, Response } from 'express';
import CreateUserService from '../../services/user/CreateUserService';
import AuthUserService from '../../services/user/AuthUserService';

const createUser = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name,email,password});
        
        return res.status(201).json({error: false, message: "user created with sucess",user});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const authUser = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({email,password});

        return res.status(200).json({error: false, message: "user authenticated", auth});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export { createUser, authUser };