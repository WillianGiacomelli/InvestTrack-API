const express = require('express'); 
import cors from 'cors';
import userRoutes from './routes/UserRoutes';

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});