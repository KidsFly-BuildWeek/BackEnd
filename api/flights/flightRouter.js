const router = require('express').Router();
const flight = require('./flightModel.js');
const users = require('../auth/authModel.js');
const restricted = require('../auth/restrictedMiddleware.js');

router.get('/', restricted, (req, res) => {
    flight.getFlights()
    .then(response => {
        return res.status(200).json(response);
    })
})

router.get('/:flight_number', restricted, (req, res) => {
    flight.getFlightByFlightNumber(req.params.flight_number)
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Error getting flight." });
    })
})

router.post('/', restricted, async (req, res) => {
    try {
        const { airline, airport, flight_number, flight_date, flight_time } = req.body;
        const addedFlight = await flight.addFlight(req.body);
        if (addedFlight) {
            const returnedFlight = await flight.getFlightByFlightNumber(flight_number)
            return res.status(201).json(returnedFlight)
        }
    } catch {
        return res.status(400).json({ error: "Missing required fields." })
    }
})

router.delete('/:flight_number', restricted, async (req, res) => {
    if (req.fullUser && req.fullUser.role.toLowerCase() === 'admin') {
        flight.removeFlight(req.params.flight_number)
        .then(() => {
            return res.status(200).json({
                message: `Flight ${req.params.flight_number} was removed`
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Something went wrong deleting flight." })
        })
    } else {
        return res.status(400).json({ error: "You do not have the correct privileges for that." })
    }
})

router.put('/:flight_number', restricted, async (req, res) => {
    if (req.body) {
        const editedFlight = await flight.editFlight(req.params.flight_number, req.body);
        const returnedFlight = await flight.getFlightByFlightNumber(req.params.flight_number);
        return res.status(200).json(returnedFlight);
    } else {
        return res.status(400).json({ error: "There was nothing to edit." });
    }
    
})

module.exports = router;