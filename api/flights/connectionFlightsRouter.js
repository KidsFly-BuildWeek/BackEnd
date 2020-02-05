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

module.exports = router;