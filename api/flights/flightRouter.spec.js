const request = require('supertest');
const jwt = require('jsonwebtoken');
const bc = require('bcrypt');
const db = require('../../data/dbConfig.js');
const server = require('../server.js');
const axios = require('axios');

describe('flight endpoints', () => {

    beforeEach(async () => {
        await db('flights').truncate();
        await db('users').truncate();
        await db('users').insert({ email: 'tim@tim.com', password: bc.hashSync('tim', 10) });        
    });

    afterEach(async () => {
        await db('flights').truncate();
        await db('users').truncate();
    })

    describe('test flight endpoints', () => {
        it('add a flight', async () => {

            // const getToken = await request(server)
            // .post('/api/auth/login')
            // .send({
            //     email: 'tim@tim.com',
            //     password: 'tim',
            // })

            let token = '';

            axios.post('http://localhost:5000/api/auth/login', {email: "tim@tim.com", password: "tim"})
            .then(response => {
                token = response.data.token;
            })
            .catch(err => {
                console.log(err);
            })

            await request(server)
            .post('/api/flights')
            // .set('Authorization', `Bearer ${token}`)
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
    })
})