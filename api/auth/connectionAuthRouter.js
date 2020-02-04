const router = require('express').Router();
const auth = require('./connectionAuthModel.js');
const bc = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'lk234k234lkjhbjbhz34ndfknJJGVC6674578dfsa';

router.get('/:email', async (req, res) => {
    const user = await auth.getConnectionUserByEmail(req.params.email);
    const connections = await auth.getConnections(user.id);
    return res.status(200).json(connections);
})

router.post('/login', (req, res) => {
    if (req.body && req.body.email && req.body.password) {
        auth.getConnectionUserByEmail(req.body.email).then(response => {
            if (response) {
                if (bc.compareSync(req.body.password, response.password)) {
                    const token = signToken(req.body);
                    return res.status(201).json({
                        message: `${response.email} was logged in successfully as a KidsFlyConnection.`,
                        token: token
                    })
                } else {
                    return res.status(400).json({ error: "KidsFlyConnection user information is incorrect." })
                }
            } else {
                return res.status(400).json({ error: "KidsFlyConnection user information is incorrect, or user doesn't exist." });
            }
        })
    }
})

router.post('/register', (req, res) => {
    if (req.body && req.body.email && req.body.password) {
        const user = req.body;
        auth.getConnectionUserByEmail(user.email).then(response => {
            if (response) {
                return res.status(400).json({ error: "User already exists. Please sign in or use a different email." })
            } else {
                const hash = bc.hashSync(user.password, 10);
                user.password = hash;
                auth.addConnectionUser(user).then(() => {
                    auth.getConnectionUserByEmail(user.email).then(resp => {
                        const signPackage = {
                            email: resp.email,
                            password: user.password,
                        }
                        const token = signToken(signPackage);
                        return res.status(201).json({
                            message: `${user.email} was registered and logged in as a KidsFlyConnection.`,
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

router.delete('/:email', async (req, res) => {
    try {
        const { id } = await auth.getConnectionUserByEmail(req.params.email);
        const removed = await auth.removeConnectionUser(id);
        if (removed === 1) {
            return res.status(200).json({ message: `${req.params.email} was removed as a KidsFlyConnection.`});
        } else {
            return res.status(500).json({ error: "Couldn't remove user." });
        }
    } catch {
        return res.status(400).json({ error: "Cannot delete user. It doesn't exist." });
    }
})

// router.put('/:email', async (req, res) => {
//     const { email } = req.params;
//     try {
//         const { id } = await auth.getConnectionUserByEmail(email);
//         const user = await auth.editConnectionUser(id, req.body);
//         return res.status(200).json(user);
//     } catch {
//         return res.status(400).json({ error: "Cannot edit user. It doesn't exist." });
//     }
// })


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