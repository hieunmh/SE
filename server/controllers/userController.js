// import path from 'path';
// import userModel from '../models/userModel';
const path = require('path');
const userModel = require('../models/userModel');

class userController {
  
  // [GET] /info
  getInfo(req, res, next) {
    // check whether or not login
    if(req.session.authorized) {
      return res.status(200).send(`Hello ${req.session.user.username}`);
    }
    res.status(401).json({
      msg: "You need to log in first"
    })
  }

  // [GET] /login
  getLoginPage(req,res,next) {
    if(req.session.authorized) {
      return res.status(200).json({
        msg: "Already logged in",
        redirect: "/info",
      })
    }
    return res.send('Hello, Please fill login form');
  }

  // [POST] /login
  async login(req, res, next) {
    const {username, password} = req.body;
    if (username && password) {
      try {
        const user = await userModel.findOne({
          where: `username='${username}' and password='${password}'`,
        })
        
        if (user) {
          // attach session id to user 
          req.session.user = user;
          req.session.authorized = true;
          return res.status(200).json({
            msg: 'login was successful',
            redirect : '/info'
          })
        } else {
          return res.status(401).json({
            msg : "wrong username or password",
          });
        }
      } catch (error) {
        next(error);
      }
    } else {
      return res.status(400).json({
        msg: "Please fill all ",
      })
    }
  }

  // [POST] /logout
  async logout(req, res, next) {
    req.session.destroy(); // destroy session
    return res.status(200).json({
      msg: "Logout successful",
      redirect: "/login"
    })
  }
}

// export default new userController();
module.exports = new userController();