const db = require('../../data/dbConfig.js');

module.exports = {
    getUserFlights,
    getFlightIds,
    addUserFlight,
    removeUserFlight,
    // editUserFlight
}

async function getUserFlights(id) {
    const flights = await db('user_flights')
    .join('users', 'users.id', id)
    .join('flights', 'flights.id', 'user_flights.flight_id')
    .where('user_flights.user_id', '=', id)
    .select('flights.flight_number', 'flights.flight_date', 'flights.flight_time', 'users.name', 'users.email', 'user_flights.number_of_children', 'user_flights.special_needs_req', 'user_flights.carry_ons');

    return flights;
}

async function addUserFlight(id, flight) {
    const sendPackage = {
        ...flight,
        user_id: id
    }
    const addedFlight = await db('user_flights').insert(sendPackage);
    return addedFlight[0];
}

async function getFlightIds(flight_number) {
    return db('flights').where({ flight_number }).select('id').first();
}

function removeUserFlight(flight_id) {
    return db('user_flights').where({ flight_id }).del();
}

// function editUserFlight()