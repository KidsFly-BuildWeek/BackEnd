const request = require('supertest');
const bc = require('bcrypt');
const db = require('../../data/dbConfig.js');
const server = require('../server.js');

describe('connection auth tests', () => {
    beforeEach(async () => {
        await db('connection').truncate();
    })

    describe('connection auth endpoints', () => {
        it('login connection user', async () => {

            await db('connection').insert({ email: 'tim@tim.com', password: bc.hashSync('tim', 10) });

            const res = await request(server)
            .post('/api/connection/login')
            .send({
                email: 'tim@tim.com',
                password: 'tim'
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('token');
        })

        it('register a connection user', async () => {
            const res = await request(server)
            .post('/api/connection/register')
            .send({
                email: 'tim@tim.com',
                password: 'tim'
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('token');
        })

        // it('edit a connection user', async () => {

        //     await db('connection').insert({ email: 'tim@tim.com', password: bc.hashSync('tim', 10) });

        //     const res = await request(server)
        //     .put('/api/connection/tim@tim.com')
        //     .send({
        //         name: "Tim"
        //     })
        //     expect(res.statusCode).toEqual(200);
        //     expect(res.body).toHaveProperty('name');
        //     expect(res.body.name).toEqual('Tim');
        // })

        it('delete a user', async () => {

            await db('connection').insert({ email: 'tim@tim.com', password: bc.hashSync('tim', 10) });

            const res = await request(server)
            .delete('/api/connection/tim@tim.com')
            
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
        })
    })

})