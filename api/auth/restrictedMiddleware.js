const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'lk234k234lkjhbjbhz34ndfknJJGVC6674578dfsa';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        // the token is not valid
        res.status(401).json({ error: "Token is not valid."})
      } else {
        req.username = decodedToken.username;
        req.userId = decodedToken.id;
        req.role = decodedToken.role;
        req.fullUser = decodedToken.fullUser;
        next();
      }
    })
  } else {
    res.status(401).json({ error: "Token was not validated."})
  }
};
