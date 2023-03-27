//authenticate
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({
      msg: 'You need to log in first',
      redirect: '/login',
    });
  } else {
    console.log(req.session.cookie);
    next();
  }
}

module.exports = authenticateUser;