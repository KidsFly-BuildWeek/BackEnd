const router = require('express').Router();
const connection = require('./connectionFlightModel.js');
const connection_users = require('../auth/connectionAuthModel.js');
const user = require('../auth/authModel.js');
const flights = require('../flights/flightModel.js');
const restricted = require('../auth/restrictedMiddleware.js');

router.get('/:email', async (req, res) => {

    const { id } = await connection_users.getConnectionUserByEmail(req.params.email);
    connection.getConnectionsForUser(id)
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        return res.status(500).json({ error: "Something went wrong getting connections." });
    })
})

router.post('/:user_email/:connection_email/:flight_number', async (req, res) => {
    const { user_email, connection_email, flight_number } = req.params;
    const connection_user = await connection_users.getConnectionUserByEmail(connection_email);
    const connection_id = connection_user.id;
    const user_info = await user.findByEmail(user_email);
    const user_id = user_info.id;
    const flight = await flights.getFlightByFlightNumberForId(flight_number);
    const flight_id = flight.id;
    if (req.body && req.body.completed) {
        const sendPackage = {
            completed: req.body.completed,
            flight_id: flight_id,
            user_id: user_id,
            connection_id: connection_id
        }
        const added = await connection.addUserConnection(sendPackage);
        if (added) {
            const addedConnection = await connection.getConnectionsForUser(connection_id);
            return res.status(201).json(addedConnection);
        } else {
            return res.status(400).json({ error: "Connection was not added." });
        }
    } else {
        const sendPackage = {
            flight_id: flight_id,
            user_id: user_id,
            connection_id: connection_id
        }
        const added = await connection.addUserConnection(sendPackage);
        if (added) {
            const addedConnection = await connection.getConnectionsForUser(connection_id);
            return res.status(201).json(addedConnection);
        } else {
            return res.status(400).json({ error: "Connection was not added." });
        }
    }
}) 

router.delete('/:flight_number/:connection_email', async (req, res) => {
    const { flight_number, connection_email } = req.params;
    const connection_user = await connection_users.getConnectionUserByEmail(connection_email);
    const connection_id = connection_user.id;
    const flight = await flights.getFlightByFlightNumberForId(flight_number);
    const flight_id = flight.id;
    const removed = await connection.removeUserConnection(connection_id, flight_id);
    
    if (removed === 1 || removed === '1') {
        return res.status(200).json({
            message: `Flight ${flight_number} was removed as a KidsFlyConnection for user ${connection_email}`
        })
    } else {
        return res.status(400).json({ error: "Connection was not removed." });
    }
})

router.put('/:flight_number/:connection_email', async (req, res) => {
    let flightId, connectionId = 0;
    let users_array = [];
    const users = await connection_users.getUsers()
    users.map(element => {
        return users_array.push({
            user_id: element.id,
            user_email: element.email
        })
    })
    let flights_array = [];
    const flight = await flights.getFlights();
    flight.map(e => {
        return flights_array.push({
            flight_id: e.id,
            flight_number: e.flight_number
        })
    })
    users_array.forEach(el => {
        if (req.params.connection_email === el.user_email) {
            connectionId = el.user_id;
        }
    })
    flights_array.forEach(ele => {
        if (req.params.flight_number === ele.flight_number) {
            flightId = ele.flight_id;
        }
    })
    if (connectionId > 0 && flightId > 0) {
        if (req.body) {
            await connection.editUserConnection(connectionId, flightId, req.body);
            connection.getConnectionsForUser(connectionId)
            .then(response => {
                return res.status(200).json(response);
            })
        } else {
            return res.status(400).json({ error: "You must include one property to edit." })
        }
    } else {
        return res.status(400).json({ error: "KidsFlyConnection user or Flight do not exist." })
    }
})

module.exports = router;