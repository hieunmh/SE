// import path from 'path';
// import userModel from '../models/userModel';
const path = require('path');
const userModel = require('../models/userModel');

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

class userController {
  // [POST] /login
  async login(req, res, next) {
    console.log('cookie: ' + req.headers.cookie);
    const { email, password } = req.body;
    if (email && password) {
      try {
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const userPassword = await userModel.findOne({
          attributes: ['password'],
          where: {
            email,
          },
        });

        if (userPassword) {
          const checkPassword = await bcrypt.compareSync(
            password,
            userPassword.password,
          );
          if (checkPassword) {
            // attach session id to user
            req.session.user = email;
            req.session.authorized = true;
            return res.status(200).json({
              msg: 'login was successful',
              redirect: '/info',
            });
          } else {
            return res.status(401).json({
              msg: 'wrong email or password',
            });
          }
        } else {
          return res.status(401).json({
            msg: 'wrong email or password',
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

  // [POST] /register
  async register(req, res, next) {
    const { email, password, name, telephone } = req.body;
    try {
      if (!email || !password || !name) {
        res.status(400).json({
          msg: 'Please fill email, password, name',
        });
      } else {
        const check_email_Exist = await userModel.checkExistence({
          where: {
            email,
          },
        });
        if (!check_email_Exist) {
          //Encrypt password with bcrypt
          const hashedPwd = await bcrypt.hash(password, saltRounds);
          if (!hashedPwd) {
            throw new Error('Error hashing pw');
          }

          const result = await userModel.registerAccount({
            email,
            password: hashedPwd,
            name,
            telephone,
          });

          if (result) {
            return res.status(201).json({
              msg: 'Register Account Success',
              email: email,
            });
          }
        } else {
          res.status(400).json({
            msg: 'email have existed',
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // [POST] /password/forgot
  async forgotPassword(req, res, next) { }

  // [PUT] /password/reset/:token
  async resetPassword(req, res, next) { }

  // [GET] /me
  async getUserProfile(req, res, next) {
    // check whether or not login
    if (req.session.authorized) {
      console.log(req.session);
      return res.status(200).send(`Hello ${req.session.user}`);
    }
    res.status(401).json({
      msg: 'You need to log in first',
    });
  }

  // [PUT] /password/update
  async updatePassword(req, res, next) { }

  // [PUT] /me/update
  async updateProfile(req, res, next) { }

  // [POST] /logout
  async logout(req, res, next) {
    req.session.destroy(); // destroy session
    return res.status(200).json({
      msg: 'Logout successful',
      redirect: '/login',
    });
  }

  // [GET] /admin/users
  async getAllUsers(req, res, next) { }

  // [GET] /admin/user/:id
  async getUserDetails(req, res, next) { }

  // {DELETE} /admin/user/:id
  async deleteUser(req, res, next) { }

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
}

module.exports = new userController();