import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import { sequelize } from './db/sequelize';

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use('/users', userRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`User service is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.log('Unable to connect to the database:', error);
});
