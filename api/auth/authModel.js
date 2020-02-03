const db = require('../../data/dbConfig.js');

module.exports = {
    getUsers,
    findUserById,
    findByEmail,
    addUser,
    removeUser,
    editUser
}

function getUsers() {
    return db('users');
}

function findUserById(id) {
    return db('users').where({ id }).first();
}

function findByEmail(email) {
    return db('users').where({ email }).first();
}

function addUser(user) {
    return db('users').insert(user);
}

function removeUser(id) {
    return db('users').where({ id }).del();
}

async function editUser(id, changes) {
    await db('users').where({ id }).update(changes)
    return db('users').where({ id }).select('email', 'name', 'street', 'city', 'state', 'zip', 'airport', 'phone', 'role', 'rating').first();
    
}