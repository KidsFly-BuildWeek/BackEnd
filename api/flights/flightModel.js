const db = require('../../data/dbConfig.js');

module.exports = {
    getFlights,
    getFlightByFlightNumber,
    getFlightByFlightNumberForId,
    getUserFlights,
    addFlight,
    removeFlight,
    editFlight,
    getFlightId
}

function getFlights() {
    return db('flights').select('airline', 'airport', 'flight_number', 'flight_date', 'flight_time');
}

function getFlightId(flight_number) {
    return db('flights').where({ flight_number }).select('id').first();
}

function getFlightByFlightNumberForId(flight_number) {
    return db('flights').where({ flight_number }).select('id').first();
}

function getFlightByFlightNumber(flight_number) {
    return db('flights').where({ flight_number }).select('airline', 'airport', 'flight_number', 'flight_date', 'flight_time').first();
}

function getUserFlights(user_id) {
    return db('user_flights').join('flights', 'flights.id', 'user_flights.flight_id').join('users', 'users.id', user_id).select('flights.airline', 'flights.airport', 'flights.flight_number', 'flights.flight_date', 'flights.flight_time');
}

function addFlight(flight) {
    return db('flights').insert(flight);
}

function removeFlight(flight_number) {
    return db('flights').where({ flight_number }).del();
}

function editFlight(flight_number, changes) {
    return db('flights').where({ flight_number }).update(changes);
}