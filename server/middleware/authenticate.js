//authenticate
const isAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      msg: 'You need to log in first',
      redirect: '/login',
    });
  } else {
    console.log(req.session.cookie);
    next();
  }
};

const isAlreadyLogin = (req, res, next) => {
  if (req.session.userId) {
    return res.status(200).json({
      msg: 'Already login!',
      redirect: '/info',
      cookie: req.headers.cookie,
    });
  } else {
    next();
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.role == 1) {
    next();
  } else {
    return res.status(401).json({
      msg: "You're not an Admin",
    });
  }
};

module.exports = {
  isAdmin,
  isAlreadyLogin,
  isAuth,
};
