const request = require('supertest');
const db = require('../../data/dbConfig.js');
const flights = require('../flights/flightModel.js');

describe('flight tests', () => {
    beforeEach(async () => {
        await db.raw('PRAGMA journal_mode = "OFF"');
        await db('flights').truncate();
    })

    it('add a flight', async () => {
        const flight = await flights.addFlight({
            airline: "Southwest",
            airport: "MCD",
            flight_number: "F35",
            flight_date: "2020-03-22",
            flight_time: "06:00"
        });

        expect(flight).toHaveLength(1);
    })

    it('edit a flight', async () => {
        const flight = await flights.addFlight({
            airline: "Southwest",
            airport: "MCD",
            flight_number: "F35",
            flight_date: "2020-03-22",
            flight_time: "06:00"
        });

        const editedFlight = await flights.editFlight("F35", {
            airline: "Delta"
        })

        const { airline } = await flights.getFlightByFlightNumber("F35");

        expect(airline).toBe('Delta');
    })

    it('remove a flight', async () => {
        const flight = await flights.addFlight({
            airline: "Southwest",
            airport: "MCD",
            flight_number: "F35",
            flight_date: "2020-03-22",
            flight_time: "06:00"
        });

        const removed = await flights.removeFlight('F35');

        expect(removed).toBe(1 || '1');
    })
})