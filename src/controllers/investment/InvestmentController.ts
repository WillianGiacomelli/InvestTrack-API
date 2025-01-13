import { Request, Response } from 'express';
import InvestmentService from '../../services/investments/InvestmentService';
import { ApiResponse } from '../../models/base/Response';

const postInvestment = async (req: Request, res: Response) => {
    try{
        const { ticker,
            amount,
            buyingPrice,
            lastTransaction,
            walletId ,
            categoryId ,
            brokerId } = req.body;

        const investmentService = new InvestmentService();

        const data = await investmentService.postInvestment({ ticker,
                                                                amount,
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

export { postInvestment };
