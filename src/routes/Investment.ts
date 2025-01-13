const { Router } = require('express');
import { postInvestment } from '../controllers/investment/InvestmentController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investment = Router();

investment.post('/investment' ,  postInvestment);

export default investment;