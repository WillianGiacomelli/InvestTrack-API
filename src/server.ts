const express = require('express'); 
import cors from 'cors';
import userRoutes from './routes/UserRoutes';
import swaggerUi from "swagger-ui-express";
import walletRoutes from './routes/WalletRoutes';
const swaggerOutput = require('./swagger-output.json');

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(walletRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});