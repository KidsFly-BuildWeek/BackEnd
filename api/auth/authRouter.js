const router = require('express').Router();
const bc = require('bcrypt');
const auth = require('./authModel.js');
const jwt = require('jsonwebtoken');
// const isAdmin = require('./admin-middleware.js');
const jwtSecret = process.env.JWT_SECRET || 'lk234k234lkjhbjbhz34ndfknJJGVC6674578dfsa';

router.get('/', (req, res) => {
    auth.getUsers()
    .then(response => {
        return res.status(200).json(response);
    })
})

router.post('/register', (req, res) => {
    if (req.body && req.body.email && req.body.password) {
        const user = req.body;
        auth.findByEmail(user.email).then(response => {
            if (response) {
                return res.status(400).json({ error: "User already exists. Please sign in or use a different email." })
            } else {
                const hash = bc.hashSync(user.password, 10);
                user.password = hash;
                auth.addUser(user).then(() => {
                    auth.findByEmail(user.email).then(resp => {
                        const signPackage = {
                            email: resp.email,
                            password: user.password,
                        }
                        const token = signToken(signPackage);
                        return res.status(201).json({
                            message: `${user.email} was registered and logged in.`,
                            token: token
                        });
                    })
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ error: "Something went wrong while registering user." });
                })
            }
        })

    } else {
        return res.status(400).json({ error: "Username and Password are required to register." })
    }
})

router.post('/login', (req, res) => {
    if (req.body && req.body.email && req.body.password) {
        auth.findByEmail(req.body.email).then(response => {
            if (response) {
                if (bc.compareSync(req.body.password, response.password)) {
                    const token = signToken(req.body);
                    return res.status(201).json({
                        message: `${response.email} was logged in successfully.`,
                        token: token
                    })
                } else {
                    return res.status(400).json({ error: "User information is incorrect." })
                }
            } else {
                return res.status(400).json({ error: "User information is incorrect, or user doesn't exist." });
            }
        })
    }
})

function signToken(user) {
    const payload = {
      userId: user.id,
      username: user.email
    }
  
    const options = {
      expiresIn: '1d'
    }
  
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;