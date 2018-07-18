const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret_this_is_my_secret');
    req.userData = { email: decodedToken.email, userId: decodedToken.userId, role: decodedToken.role };
    // , role: decodedToken.role
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
}
