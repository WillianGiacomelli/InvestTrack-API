import { Request, Response } from 'express';
import { ApiResponse } from '../../models/base/Response';
import WalletService from '../../services/wallet/WalletService';

const getWallet = async (req: Request, res: Response) => {
    try{
        const {userId} = req.query;

        const walletService = new WalletService();

        const wallet = await walletService.getwallet({userId: Number(userId)});

        if(!wallet)
            return res.status(201).json(ApiResponse.success("Carteira não encontrada", null));        

        return res.status(201).json(ApiResponse.success("", [wallet]));
    }catch(error){
        if(error.message === "Carteira não encontrada"){
            return res.status(404).json(ApiResponse.error(error.message));
        }
        res.status(500).json(ApiResponse.error(error.message));
    }
}

const postWallet = async (req: Request, res: Response) => {
    try{
        const {id, name} = req.body;

        const walletService = new WalletService();

        const wallet = await walletService.createWallet({id, name});

        return res.status(201).json(ApiResponse.success("Carteira criada com sucesso", [wallet]));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

export { getWallet,postWallet };