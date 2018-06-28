const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_is_my_secret');
    next();
  } catch (error) {
    res.status(401).son({message: 'Auth failed!' });
  }
}
