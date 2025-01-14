const { Router } = require('express');
import { getInvestmentBrokers } from '../controllers/investment/broker/InvestmentBrokerController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investmentBroker = Router();

investmentBroker.get('/investment-broker' ,verifyAuthentication,  getInvestmentBrokers);

export default investmentBroker;