import { Request, Response } from 'express';
import AuthUserService from '../../services/user/AuthUserService';
import { ApiResponse } from '../../models/base/Response';
import WalletService from '../../services/wallet/WalletService';

const getWallet = async (req: Request, res: Response) => {
    try{
        const {userId} = req.query;

        const walletService = new WalletService();

        const wallet = await walletService.getwallet({userId: Number(userId)});
        
        return res.status(201).json(ApiResponse.success("", [wallet]));
    }catch(error){
        if(error.message === "Carteira não encontrada"){
            return res.status(404).json(ApiResponse.error(error.message));
        }
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

export { getWallet, authUser };