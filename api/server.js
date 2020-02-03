const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/authRouter.js');
const connection = require('./auth/connectionAuthRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    return res.send('Server is up and running.');
})

server.use('/api/auth', authRouter);
server.use('/api/connection', connection);

module.exports = server;