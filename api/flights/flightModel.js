const db = require('../../data/dbConfig.js');

module.exports = {
    getFlights,
    getFlightByFlightNumber,
    getUserFlights,
    addFlight,
    removeFlight,
    editFlight
}

function getFlights() {
    return db('flights')
}

function getFlightByFlightNumber(flight_number) {
    return db('flights').where({ flight_number }).first();
}

function getUserFlights(user_id) {
    return db('user_flights').join('flights', 'flights.id', 'user_flights.flight_id').join('users', 'users.id', user_id).select('flights.airline', 'flights.airport', 'flights.flight_number', 'flights.flight_date', 'flights.flight_time');
}

function addFlight(flight) {
    return db('flights').insert(flight);
}

function removeFlight(id) {
    return db('flights').where({ id }).del();
}

function editFlight(id, changes) {
    return db('flights').where({ id }).update(changes);
}