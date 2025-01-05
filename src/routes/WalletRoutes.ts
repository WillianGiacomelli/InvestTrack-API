const { Router } = require('express');
import { getWallet, postWallet } from '../controllers/wallet/WalletController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const walletRoutes = Router();

walletRoutes.get('/wallet' ,verifyAuthentication,  getWallet);
walletRoutes.post('/wallet' ,verifyAuthentication,  postWallet);

export default walletRoutes;