const { Router } = require('express');
import { getInvestments, postInvestment } from '../controllers/investment/InvestmentController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investment = Router();

investment.post('/investment' , verifyAuthentication, postInvestment);
investment.get('/investment' , getInvestments);

export default investment;