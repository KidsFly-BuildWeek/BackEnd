const request = require('supertest');
const db = require('../../data/dbConfig.js');
const auth = require('../auth/authModel.js');

describe('auth tests', () => {
    beforeEach(async () => {
        await db.raw('PRAGMA journal_mode = "OFF"');
        await db('users').truncate();
    })

    describe('auth testing', () => {
        it('should run in testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })

        it('add a user', async () => {
            await auth.addUser({ email: "tom@tim.com", password: "tim" });
    
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
            await auth.addUser({ email: "tammmy@tim.com", password: "tim" });

            const { id } = await auth.findByEmail("tammmy@tim.com");

            await auth.editUser(id, {name: "tammy"});

            const { name } = await auth.findByEmail("tammmy@tim.com");
            expect(name).toBe('tammy');
        })
    })
})