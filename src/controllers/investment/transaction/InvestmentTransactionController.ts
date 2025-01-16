import { Request, Response } from 'express';

import InvestmentCategoryService from '../../../services/investments/category/InvestmentCategoryService';
import { ApiResponse } from '../../../models/base/Response';
import InvestmentTransactionService from '../../../services/investments/transactions/InvestmentTransactionService';

const getWalletTransactions = async (req: Request, res: Response) => {
    try{
        const { walletId } = req.query;

        const investmentTransactionService = new InvestmentTransactionService();

        const data = await investmentTransactionService.getTransactionsByWalletId(+walletId);

        if(data.length === 0) return res.status(200).json(ApiResponse.success("Nenhuma transação encontrada", []));

        return res.status(200).json(ApiResponse.success("", [data]));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

const removeWalletTransaction = async (req: Request, res: Response) => {
    try{
        const { transactionId } = req.query;

        const investmentTransactionService = new InvestmentTransactionService();

        const data = await investmentTransactionService.removeTransaction(+transactionId);

        return res.status(204).json(ApiResponse.success("Transação removida com sucesso", []));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

const putWalletTransaction = async (req: Request, res: Response) => {
    try{
        const { ticker,
            id,
            investmentId,
            amount,
            buyingPrice,
            lastTransaction,
            walletId ,
            categoryId ,
            brokerId } = req.body;

        const transactionService = new InvestmentTransactionService();

        const data = await transactionService.putTransaction({ ticker,
                                                                amount,
                                                                id,
                                                                investmentId,
                                                                buyingPrice,
                                                                lastTransaction,
                                                                walletId ,
                                                                categoryId ,
                                                                brokerId });

        return res.status(200).json(ApiResponse.success("", [data]));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

export { getWalletTransactions,removeWalletTransaction,putWalletTransaction};
