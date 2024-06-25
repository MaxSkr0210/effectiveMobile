const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const actionRoutes = require('./routes/actionRoutes');
const sequelize = require('./db/sequelize');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/actions', actionRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Action history service is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.log('Unable to connect to the database:', error);
});