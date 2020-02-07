const db = require('../../data/dbConfig.js');
const userFlights = require('../flights/userFlightsModel.js');
const users = require('../auth/authModel.js');
const flights = require('../flights/flightModel.js');

describe('auth tests', () => {
    beforeEach(async () => {
        await db.raw('PRAGMA journal_mode = "OFF"');
        await db('users').truncate();
        await db('flights').truncate();
        await db('user_flights').truncate();
    })

    it('add a user flight', async () => {
        await users.addUser({ email: "tim@tim.com", password: "tim" });

        const { id } = await users.findByEmail("tim@tim.com")

        await flights.addFlight({
            airline: "Southwest",
            airport: "MCD",
            flight_number: "F35",
            flight_date: "2020-03-22",
            flight_time: "06:00"
        });

        const flight_id = await flights.getFlightId('F35');

        await userFlights.addUserFlight(id, {
            carry_ons: 1,
            number_of_children: 1,
            special_needs_req: true,
            completed: false,
            flight_id: flight_id.id
        })

        const get_user_flights = await userFlights.getUserFlights(id);

        expect(get_user_flights).toHaveLength(1);
    })

    it('remove a user flight', async () => {
        await users.addUser({ email: "tim@tim.com", password: "tim" });

        const { id } = await users.findByEmail("tim@tim.com")

        await flights.addFlight({
            airline: "Southwest",
            airport: "MCD",
            flight_number: "F35",
            flight_date: "2020-03-22",
            flight_time: "06:00"
        });

        const flight_id = await flights.getFlightId('F35');

        await userFlights.addUserFlight(id, {
            carry_ons: 1,
            number_of_children: 1,
            special_needs_req: true,
            completed: false,
            flight_id: flight_id.id
        })

        const removedUserFlight = await userFlights.removeUserFlight(flight_id.id);

        expect(removedUserFlight).toBe(1 || '1');
    })
})