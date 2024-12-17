const { Router } = require('express');
import { getWallet } from '../controllers/wallet/WalletController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const walletRoutes = Router();

walletRoutes.get('/wallet' ,verifyAuthentication,  getWallet);

export default walletRoutes;