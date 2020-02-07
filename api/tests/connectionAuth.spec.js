const db = require('../../data/dbConfig.js');
const auth = require('../auth/connectionAuthModel.js');

describe('connection auth tests', () => {
    beforeEach(async () => {
        await db.raw('PRAGMA journal_mode = "OFF"');
        await db('connection').truncate();
    })

   it('add a user', async () => {
        await auth.addConnectionUser({ email: "tim@tim.com", password: "tim" });

        const users = await db('connection');

        expect(users).toHaveLength(1);
    })

    it('remove a user', async () => {
        await auth.addConnectionUser({ email: "tim@tim.com", password: "tim" });

        const { id } = await auth.getConnectionUserByEmail("tim@tim.com")

        await auth.removeConnectionUser(id);

        const users = await db('connection');
        expect(users).toHaveLength(0);
    })

    it('edit user', async () => {
        await auth.addConnectionUser({ email: "tim@tim.com", password: "tim" });

        const { id } = await auth.getConnectionUserByEmail("tim@tim.com")

        await auth.editConnectionUser(id, {name: "tim"});

        const { name } = await auth.getConnectionUserByEmail("tim@tim.com");
        expect(name).toBe('tim');
    })
})