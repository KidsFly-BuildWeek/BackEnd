const router = require('express').Router();
const bc = require('bcrypt');
const auth = require('./authModel.js');
const jwt = require('jsonwebtoken');
// const isAdmin = require('./admin-middleware.js');

router.get('/', (req, res) => {
    auth.getUsers()
    .then(response => {
        return res.status(200).json(response);
    })
})

module.exports = router;