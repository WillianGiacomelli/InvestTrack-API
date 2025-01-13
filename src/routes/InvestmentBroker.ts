const { Router } = require('express');
import { getInvestmentBrokers } from '../controllers/investment/broker/InvestmentBrokerController';
import { getInvestmentCategory } from '../controllers/investment/category/InvestmentCategoryController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investmentBroker = Router();

investmentBroker.get('/investment-broker' ,  getInvestmentBrokers);

export default investmentBroker;