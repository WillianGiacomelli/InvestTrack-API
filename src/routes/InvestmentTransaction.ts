const { Router } = require('express');
import { getWalletTransactions } from '../controllers/investment/transaction/InvestmentTransactionController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investmentTransaction = Router();

investmentTransaction.get("/investment-transaction" , verifyAuthentication, getWalletTransactions);

export default investmentTransaction;