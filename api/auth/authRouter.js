const router = require('express').Router();
const bc = require('bcrypt');
const auth = require('./authModel.js');
const jwt = require('jsonwebtoken');
const restricted = require('./restrictedMiddleware.js');
const jwtSecret = process.env.JWT_SECRET || 'lk234k234lkjhbjbhz34ndfknJJGVC6674578dfsa';

//Get all users
router.get('/', restricted, (req, res) => {
    console.log(req.fullUser.role)
    // if (req.fullUser && req.fullUser.role === 'admin') {
        auth.getUsers()
        .then(response => {
            return res.status(200).json(response);
        })
    // } else {
    //     return res.status(400).json({ error: "You do not have the correct privileges to access this resource." });
    // }
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
                        if (resp.role.toLowerCase() === 'admin') {
                            return res.status(201).json({
                                message: `${user.email} was registered and logged in as an admin.`,
                                token: token,
                                role: user.role
                            });
                        }
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
                    const sendUser = {
                        ...response,
                        email: req.body.email,
                        password: req.body.password
                    }
                    const token = signToken(sendUser);
                    if (response.role.toLowerCase() === 'admin') {
                        return res.status(201).json({
                            message: `${req.body.email} was logged in as an admin.`,
                            token: token,
                            role: response.role
                        });
                    }
                    return res.status(201).json({
                        message: `${req.body.email} was registered and logged in.`,
                        token: token
                    });
                } else {
                    return res.status(400).json({ error: "User information is incorrect." })
                }
            } else {
                return res.status(400).json({ error: "User information is incorrect, or user doesn't exist." });
            }
        })
    }
})

router.put('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const { id } = await auth.findByEmail(email);
        const user = await auth.editUser(id, req.body);
        return res.status(200).json(user);
    } catch {
        return res.status(400).json({ error: "Cannot edit user. It doesn't exist." });
    }
})

router.delete('/:email', async (req, res) => {
    try {
        const { id } = await auth.findByEmail(req.params.email);
        const removed = await auth.removeUser(id);
        if (removed === 1) {
            return res.status(200).json({ message: `${req.params.email} was removed.`});
        } else {
            return res.status(500).json({ error: "Couldn't remove user." });
        }
    } catch {
        return res.status(400).json({ error: "Cannot delete user. It doesn't exist." });
    }
})

function signToken(user) {
    const payload = {
      userId: user.id,
      username: user.email,
      fullUser: user
    }
  
    const options = {
      expiresIn: '1d'
    }
  
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;