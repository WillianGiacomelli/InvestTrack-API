const { Router } = require('express');
import { getWalletTransactions, removeWalletTransaction } from '../controllers/investment/transaction/InvestmentTransactionController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investmentTransaction = Router();

investmentTransaction.get("/investment-transaction" , verifyAuthentication, getWalletTransactions);
investmentTransaction.delete("/investment-transaction" , verifyAuthentication, removeWalletTransaction);

export default investmentTransaction;