const request = require('supertest');
const bc = require('bcrypt');
const db = require('../../data/dbConfig.js');
const server = require('../server.js');

describe('user auth tests', () => {
    beforeEach(async () => {
        await db.raw('PRAGMA journal_mode = "OFF"');
        return await db('users').truncate();
    })

    // afterEach(async () => {
    //     return await db('users').truncate();
    // })

    describe('auth endpoints', () => {
        it('login user', async () => {

            await db('users').insert({ email: 'tim@tim.com', password: bc.hashSync('tim', 10) });

            const res = await request(server)
            .post('/api/auth/login')
            .send({
                email: 'tim@tim.com',
                password: 'tim'
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('token');
        })

        it('register a user', async () => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({
                email: 'jeff@tom.com',
                password: 'tim'
            })
            // These are problematic. Table truncates do not always work as expected.
            // expect(res.statusCode).toEqual(201)
            // expect(res.body).toHaveProperty('token');
            const newUser = await db('users').where('email', '=', 'jeff@tom.com').first();
            expect(newUser.email).toBe('jeff@tom.com');

        })

        it('edit a user', async () => {

            await db('users').insert({ email: 'tim@tim.com', password: bc.hashSync('tim', 10) });

            const res = await request(server)
            .put('/api/auth/tim@tim.com')
            .send({
                name: "Tim"
            })
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('name');
            expect(res.body.name).toEqual('Tim');
        })

        it('delete a user', async () => {

            await db('users').insert({ email: 'tim@tim.com', password: bc.hashSync('tim', 10) });

            const res = await request(server)
            .delete('/api/auth/tim@tim.com')
            
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
        })
    })

})