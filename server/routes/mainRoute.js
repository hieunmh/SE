const express = require('express');
const {isAdmin, isAuth, isAlreadyLogin} = require('../middleware/authenticate');

const router = express.Router();


router.get('/home', (req, res, next) => {
  res.send("Home Page");
})


module.exports = router;