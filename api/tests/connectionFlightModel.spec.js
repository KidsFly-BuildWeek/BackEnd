const db = require('../../data/dbConfig.js');
const userFlights = require('../flights/userFlightsModel.js');
const users = require('../auth/authModel.js');
const flights = require('../flights/flightModel.js');
const connectionUsers = require('../auth/connectionAuthModel.js');
const connectionFlights = require('../flights/connectionFlightModel.js');

describe('connection flight tests', () => {
    beforeEach(async () => {
        await db.raw('PRAGMA journal_mode = "OFF"');
        await db('users').truncate();
        await db('flights').truncate();
        await db('user_flights').truncate();
        await db('connection').truncate();
        await db('connection_flights').truncate();
    })

    it('add a connection flight', async () => {
        await users.addUser({ email: "tem@tim.com", password: "tim" });

        const { id } = await users.findByEmail("tem@tim.com");

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

        const connection_user = connectionUsers.addConnectionUser({
            email: "tom@tom.com",
            password: "tom"
        })

        const connection_id = connectionUsers.getConnectionUserByEmail("tom@tom.com");

        await connectionFlights.addUserConnection({
            flight_id: flight_id.id,
            user_id: id,
            connection_id: connection_id.id
        })

        const addedConnectionFlight = await connectionFlights.getConnections();

        expect(addedConnectionFlight).toHaveLength(1);
    })

    it('remove a connection flight', async () => {
        await users.addUser({ email: "tam@tim.com", password: "tim" });

        const { id } = await users.findByEmail("tam@tim.com");

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

        const connection_user = connectionUsers.addConnectionUser({
            email: "tam@tom.com",
            password: "tom"
        })

        await connectionFlights.addUserConnection({
            flight_id: flight_id.id,
            user_id: id,
            connection_id: 1
        })

        const removed = await connectionFlights.removeUserConnection(1, flight_id.id);
        expect(removed).toBe(1);
     })

     it('edit a connection flight', async () => {
        await users.addUser({ email: "tum@tim.com", password: "tim" });

        const { id } = await users.findByEmail("tum@tim.com");

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

        await connectionUsers.addConnectionUser({
            email: "tum@tom.com",
            password: "tom"
        })

        await connectionFlights.addUserConnection({
            flight_id: flight_id.id,
            user_id: id,
            connection_id: 1
        })

        await connectionFlights.editUserConnection(1, flight_id.id, { completed: true });
        const addedConnectionFlight = await connectionFlights.getConnections();

        expect(addedConnectionFlight[0].completed).toEqual(1 || '1');

     })
})