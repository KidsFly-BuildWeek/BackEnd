const request = require('supertest');
const bc = require('bcrypt');
const db = require('../../data/dbConfig.js');
const server = require('../server.js');
const flightModel = require('../flights/flightModel.js');

describe('flight endpoints', () => {

    beforeEach(async () => {
        await db.raw('PRAGMA journal_mode = "OFF"');
        await db('flights').truncate();
        await db('users').truncate();
    });

    describe('test flight endpoints', () => {
        it('add a flight', async () => {
            await db('users').insert({ email: 'joe@tim.com', password: bc.hashSync('tim', 10), role: 'admin' });

            const getToken = await request(server)
            .post('/api/auth/login')
            .send({
                email: 'joe@tim.com',
                password: 'tim'
            })

            const token = getToken.body.token;

            await request(server)
            .post('/api/flights')
            .set('Authorization', token)
            .send({
                airline: "Southwest", 
                airport: "MCD",
                flight_number: "F40",
                flight_date: "2020-03-22",
                flight_time: "06:00"
            })
            .expect(201)
            .expect('Content-Type', /json/);
        })

        it('remove a flight, admin restricted', async () => {
            await db('users').insert({ email: 'jimmy@tim.com', password: bc.hashSync('tim', 10), role: 'admin' });
            await db('flights').insert({
                airline: "Delta", 
                airport: "MCD",
                flight_number: "F41",
                flight_date: "2020-03-22",
                flight_time: "06:00"
            })

            const getToken = await request(server)
            .post('/api/auth/login')
            .send({
                email: 'jimmy@tim.com',
                password: 'tim'
            })

            const token = getToken.body.token;

            await request(server)
            .delete('/api/flights/F41')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /json/);
        })

        it('edit a flight, admin restricted', async () => {
            await db('users').insert({ email: 'johnny@tim.com', password: bc.hashSync('tim', 10), role: 'admin' });
            await db('flights').insert({
                airline: "Delta", 
                airport: "MCD",
                flight_number: "F43",
                flight_date: "2020-03-22",
                flight_time: "06:00"
            })

            const getToken = await request(server)
            .post('/api/auth/login')
            .send({
                email: 'johnny@tim.com',
                password: 'tim'
            })

            const token = getToken.body.token;

            await request(server)
            .put('/api/flights/F43')
            .set('Authorization', token)
            .send({
                airline: "Southwest"
            })
            .expect(200)
            .expect('Content-Type', /json/);

            const editFlight = await flightModel.getFlightByFlightNumber('F43');

            // console.log(editFlight)
            
            expect(editFlight.airline).toBe('Southwest');
        })
    })
})