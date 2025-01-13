import { Request, Response } from 'express';

import InvestmentCategoryService from '../../../services/investments/category/InvestmentCategoryService';
import { ApiResponse } from '../../../models/base/Response';

const getInvestmentCategory = async (req: Request, res: Response) => {
    try{
        const investmentCategoryService = new InvestmentCategoryService();

        const data = await investmentCategoryService.getCategories();

        return res.status(200).json(ApiResponse.success("", [data]));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

export { getInvestmentCategory };
