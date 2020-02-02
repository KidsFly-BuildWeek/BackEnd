const db = require('../../data/dbConfig.js');

module.exports = {
    getUsers,
    findUserById,
    findByUsername,
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

function findByUsername(username) {
    return db('users').where({ username }).first();
}

function addUser(user) {
    return db('users').insert(user);
}

function removeUser(id) {
    return db('users').where({ id }).del();
}

function editUser(id, changes) {
    return db('users').where({ id }).update(changes);
}