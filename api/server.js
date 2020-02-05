const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/authRouter.js');
const connectionRouter = require('./auth/connectionAuthRouter.js');
const connection = require('./flights/connectionFlightsRouter.js');
const flightRouter = require('../api/flights/flightRouter.js');
const userFlightsRouter = require('./flights/userFlightsRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    return res.send('Server is up and running.');
})

server.use('/api/auth', authRouter);
server.use('/api/connection', connectionRouter);
server.use('/api/flights', flightRouter);
server.use('/api/user_flights', userFlightsRouter)
server.use('/api/user_connection', connection);

module.exports = server;