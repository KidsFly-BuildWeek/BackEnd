const router = require('express').Router();
const flight = require('./flightModel.js');

router.get('/', (req, res) => {
    flight.getFlights()
    .then(response => {
        return res.status(200).json(response);
    })
})

router.post('/', (req, res) => {
    try {
        const { id, airline, airport, flight_number, flight_date, flight_time } = req.body;
    } catch {
        return res.status(400).json({ error: "Missing required fields." })
    }
})

module.exports = router;