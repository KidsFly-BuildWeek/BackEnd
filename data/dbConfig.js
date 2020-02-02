const environment = process.env.ENVIRONMENT || 'development';

const knexConfig = require('../knexfile.js')[environment];

module.exports = require('knex')(knexConfig);