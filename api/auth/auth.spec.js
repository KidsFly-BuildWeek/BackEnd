const request = require('supertest');
const db = require('../../data/dbConfig.js');
const auth = require('./authModel.js');
const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRouter = require('./authRouter.js');

describe('auth tests', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('check for testing environment', () => {
        it('should run in testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })

        it('add a user', async () => {
            await auth.addUser({ email: "tim@tim.com", password: "tim" });
    
            const users = await db('users');
    
            expect(users).toHaveLength(1);
        })

        it('remove a user', async () => {
            await auth.addUser({ email: "tim@tim.com", password: "tim" });

            const { id } = await auth.findByEmail("tim@tim.com")

            await auth.removeUser(id);

            const users = await db('users');
            expect(users).toHaveLength(0);
        })

        it('edit user', async () => {
            await auth.addUser({ email: "tim@tim.com", password: "tim" });

            const { id } = await auth.findByEmail("tim@tim.com");

            await auth.editUser(id, {name: "tim"});

            const { name } = await auth.findByEmail("tim@tim.com");
            expect(name).toBe('tim');
        })
    })
})