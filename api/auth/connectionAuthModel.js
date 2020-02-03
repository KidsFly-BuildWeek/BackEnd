const db = require('../../data/dbConfig.js');

module.exports = {
    getConnections,
    addConnectionUser,
    removeConnectionUser,
    editConnectionUser,
    getConnectionUserById,
    getConnectionUserByEmail
}

// This may need editing
async function getConnections(id) {
    const connection = await db('connection_flights')
    .where({ id })
    // .join('connection', 'connection.id', 'connection_flights.connection_id')
    .join('flights', 'flights.id', 'connection_flights.flight_id')
    .join('users', 'users.id', 'connection_flights.user_id')
    .select('users.name', 'users.email', 'flights.airline', 'flights.airport', 'flights.flight_number', 'flights.flight_date', 'flights.flight_time');
    return connection;
}

async function addConnectionUser(user) {
    return await db('connection').insert(user);
}

function getConnectionUserById(id) {
    return db('connection').where(id).first();
}

function removeConnectionUser(id) {
    return db('connection').where({ id }).del();
}

async function editConnectionUser(id, changes) {
    const [id] = await db('connection').where({ id }).update(changes);
    return getConnectionUserById(id);
}

function getConnectionUserByEmail(email) {
    return db('connection').where({ email }).first();
}