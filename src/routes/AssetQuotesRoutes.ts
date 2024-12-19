const { Router } = require('express');
import { getAscClosingStockQuotes } from '../controllers/quotes/AssetQuoteController';

const assetQuotesRoutes = Router();

assetQuotesRoutes.get('/stock/quote' ,  getAscClosingStockQuotes);

export default assetQuotesRoutes;