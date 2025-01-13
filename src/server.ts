const express = require('express'); 
import cors from 'cors';
import userRoutes from './routes/UserRoutes';
import swaggerUi from "swagger-ui-express";
import walletRoutes from './routes/WalletRoutes';
import assetQuotesRoutes from './routes/AssetQuotesRoutes';
import investmentCategory from './routes/InvestmentCategory';
import investmentBroker from './routes/InvestmentBroker';
import investment from './routes/Investment';

const swaggerOutput = require('./swagger-output.json');

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(walletRoutes);
app.use(assetQuotesRoutes);
app.use(investmentCategory);
app.use(investmentBroker);
app.use(investment);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});