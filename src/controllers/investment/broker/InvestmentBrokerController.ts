import { Request, Response } from 'express';

import { ApiResponse } from '../../../models/base/Response';
import InvestmentBrokerService from '../../../services/investments/broker/InvestmentBrokerService';

const getInvestmentBrokers = async (req: Request, res: Response) => {
    try{
        const investmentCategoryService = new InvestmentBrokerService();

        const data = await investmentCategoryService.getBrokers();

        return res.status(200).json(ApiResponse.success("", [data]));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

export { getInvestmentBrokers };
