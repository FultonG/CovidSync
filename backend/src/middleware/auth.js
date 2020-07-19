const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('invalid user token');
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.status(400).send('No Token Provided');
  }
};

module.exports = {
  checkToken,
};
