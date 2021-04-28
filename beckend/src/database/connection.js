const knex = require('knex');
const configuratiron = require('../../knexfile');

const connection = knex(configuratiron.development);

module.exports = connection;