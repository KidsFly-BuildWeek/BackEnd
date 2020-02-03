const router = require('express').Router();
const flight = require('./flightModel.js');

router.get('/', (req, res) => {
    flight.getFlights()
    .then(response => {
        return res.status(200).json(response);
    })
})

router.post('/', async (req, res) => {
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

router.delete('/:flight_number', (req, res) => {
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
})

router.put('/:flight_number', async (req, res) => {
    if (req.body) {
        const editedFlight = await flight.editFlight(req.params.flight_number, req.body);
        const returnedFlight = await flight.getFlightByFlightNumber(req.params.flight_number);
        return res.status(200).json(returnedFlight);
    } else {
        return res.status(400).json({ error: "There was nothing to edit." });
    }
    
})

module.exports = router;