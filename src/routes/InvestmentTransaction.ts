const { Router } = require('express');
import { getWalletTransactions, putWalletTransaction, removeWalletTransaction } from '../controllers/investment/transaction/InvestmentTransactionController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investmentTransaction = Router();

investmentTransaction.get("/investment-transaction" , verifyAuthentication, getWalletTransactions);
investmentTransaction.delete("/investment-transaction" , verifyAuthentication, removeWalletTransaction);
investmentTransaction.put("/investment-transaction" , verifyAuthentication, putWalletTransaction);

export default investmentTransaction;