const { Router } = require('express');
import { getInvestmentCategory } from '../controllers/investment/category/InvestmentCategoryController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const investmentCategory = Router();

investmentCategory.get('/investment-category' ,verifyAuthentication,  getInvestmentCategory);

export default investmentCategory;