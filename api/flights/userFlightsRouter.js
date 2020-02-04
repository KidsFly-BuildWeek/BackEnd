const router = require('express').Router();
const userFlights = require('./userFlightsModel.js');
const restricted = require('../auth/restrictedMiddleware.js');
const flights = require('../flights/flightModel.js');

router.get('/', restricted, async (req, res) => {
    const { id } = req.fullUser;
    const flights = await userFlights.getUserFlights(id);
    if (flights) {
        return res.status(200).json(flights);
    } else {
        return res.status(400).json({ error: "Something went wrong, or user doesn't have any flights." });
    }
})

router.post('/:flight_number', restricted, async (req, res) => {
    const { id } = await flights.getFlightId(req.params.flight_number);
    const sendPackage = {
        ...req.body,
        flight_id: id
    }
    if (req.body && req.body.carry_ons && req.body.number_of_children) {
        await userFlights.addUserFlight(req.fullUser.id, sendPackage);
        const users_flights = await userFlights.getUserFlights(req.fullUser.id);
        return res.status(201).json(users_flights);
    } else {
        return res.status(400).json({ error: "Please include carry-on amount and the number of children flying." })
    }
})

router.delete('/:flight_number', restricted, async (req, res) => {
    try {
        const { id } = await userFlights.getFlightIds(req.params.flight_number);
        if (req.fullUser && req.fullUser.role.toLowerCase() === 'admin') {
            const removed = await userFlights.removeUserFlight(id);
            if (removed === 1 || removed === '1') {
                return res.status(200).json({ message: `Flight: ${req.params.flight_number} was removed as a user flight.` })
            } else {
                return res.status(500).json({ error: "Something went wrong removing user flight." })
            }
        } else {
            return res.status(400).json({ error: "You do not have the correct privileges to remove a user's flight." })
        }
    } catch {
        return res.status(400).json({ error: `Flight ${req.params.flight_number} does not exist as a user flight.` });
    }
})

module.exports = router;