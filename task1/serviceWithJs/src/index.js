const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const actionRoutes = require('./routes/actionRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const sequelize = new Sequelize('postgres://postgres:maxim0210@localhost:5432/actions');

app.use('/actions', actionRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Action history service is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.log('Unable to connect to the database:', error);
});