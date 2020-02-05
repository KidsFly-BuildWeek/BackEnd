const db = require('../../data/dbConfig.js');

module.exports = {
    getConnectionsForUser,
    addUserConnection,
    removeUserConnection,
    editUserConnection,
}

async function getConnectionsForUser(id) {
    const connection = await db('connection_flights')
    .join('connection', 'connection.id', 'connection_flights.connection_id')
    .join('flights', 'flights.id', 'connection_flights.flight_id')
    .join('users', 'users.id', 'connection_flights.user_id')
    .join('user_flights', 'user_flights.user_id', 'connection_flights.user_id')
    .where('connection_flights.user_id', '=', id)
    .select('users.name as userName', 'users.email as userEmail', 'flights.airline', 'flights.airport', 'flights.flight_number', 'flights.flight_date', 'flights.flight_time', 'user_flights.carry_ons', 'user_flights.number_of_children', 'user_flights.special_needs_req', 'connection_flights.completed', 'connection.name as connectionName', 'connection.email as connectionEmail');
    return connection;
}

function addUserConnection(connection) {
    return db('connection_flights').insert(connection);
}

function removeUserConnection(connection_id, flight_id) {
    return db('connection_flights')
    .where('connection_id', '=', connection_id)
    .andWhere('flight_id', '=', flight_id)
    .del();
}

function editUserConnection(connection_id, flight_id, changes) {
    return db('connection_flights')
    .where('connection_id', '=', connection_id)
    .andWhere('flight_id', '=', flight_id)
    .update(changes);
}