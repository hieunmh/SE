// import path from 'path';
// import userModel from '../models/userModel';
const path = require('path');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// bcrypt
const saltRounds = 10;
class userController {
  // [GET] /info
  getInfo(req, res, next) {
    // check whether or not login
    if (req.session.authorized) {
      console.log(req.session);
      return res.status(200).send(`Hello ${req.session.user.username}`);
    }
    res.status(401).json({
      msg: 'You need to log in first',
    });
  }

  // [GET] /login
  getLoginPage(req, res, next) {
    if (req.session.authorized) {
      return res.status(200).json({
        msg: 'Already logged in',
        redirect: '/info',
      });
    }
    return res.send('Hello, Please fill login form');
  }

  // [POST] /login
  async login(req, res, next) {
    const { username, password } = req.body;
    if (username && password) {
      try {
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const userPassword = await userModel.findOne({
          attributes: ['password'],
          where: {
            username,
          },
        });
        const checkPassword = await bcrypt.compareSync(
          password,
          userPassword.password,
        );
        if (checkPassword) {
          // attach session id to user
          req.session.user = username;
          req.session.authorized = true;
          return res.status(200).json({
            msg: 'login was successful',
            redirect: '/info',
          });
          
        } else {
          return res.status(401).json({
            msg: 'wrong username or password',
          });
        }
      } catch (error) {
        next(error);
      }
    } else {
      return res.status(400).json({
        msg: 'Please fill all ',
      });
    }
  }

  // [POST] /logout
  async logout(req, res, next) {
    req.session.destroy(); // destroy session
    return res.status(200).json({
      msg: 'Logout successful',
      redirect: '/login',
    });
  }

  // [POST] /register
  async register(req, res, next) {
    const { username, password, first_name, last_name, telephone } = req.body;
    try {
      if (!username || !password) {
        res.status(400).json({
          msg: 'Please fill username, password',
        });
      } else {
        const check_Username_Exist = await userModel.checkExistence({
          where: {
            username,
          },
        });
        if (!check_Username_Exist) {
          //Encrypt password with bcrypt
          const hashedPwd = await bcrypt.hash(password, saltRounds);
          if (!hashedPwd) {
            throw new Error('Error hashing pw');
          }

          const result = await userModel.registerAccount({
            username,
            password: hashedPwd,
            first_name,
            last_name,
            telephone,
          });

          if (result) {
            return res.status(201).json({
              msg: 'Register Account Success',
              username: username,
            });
          }
        } else {
          res.status(400).json({
            msg: 'Username have existed',
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

// export default new userController();
module.exports = new userController();
