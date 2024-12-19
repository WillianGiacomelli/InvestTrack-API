import { Request, Response } from 'express';

import { ApiResponse } from '../../models/base/Response';
import QuotesService from '../../services/quotes/QuotesService';

const getAscClosingStockQuotes = async (req: Request, res: Response) => {
    try{
        const quoteService = new QuotesService();

        const data = await quoteService.getStockQuotes();

        return res.status(200).json(ApiResponse.success("", [data]));
    }catch(error){
        res.status(500).json(ApiResponse.error(error.message));
    }
}

export { getAscClosingStockQuotes };
