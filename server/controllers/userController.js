const path = require('path');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const session = require('express-session');

// bcrypt
const saltRounds = 10;
class userController {
  // [GET] /info
  getInfo(req, res, next) {
    // check whether or not login
    console.log(req.session);
    return res.status(200).send(`Hello ${req.session.userId}`);
  }

  // [GET] /login
  getLoginPage(req, res, next) {
    if (req.session.userId) {
      return res.status(200).json({
        msg: 'Already logged in',
        redirect: '/info',
      });
    }
    return res.send('Hello, Please fill login form');
  }

  // [POST] /login
  async login(req, res, next) {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const findUser = await userModel.findOne({
          attributes: ['id', 'password', 'name', 'role'],
          where: {
            email,
          },
        });
        console.log(findUser);

        if (findUser) {
          const checkPassword = await bcrypt.compareSync(
            password,
            findUser.password,
          );
          if (checkPassword) {
            // attach session id to user
            req.session.userId = findUser.id;
            req.session.role = findUser.role;
            // DEBUG
            console.log(req.headers.cookie);

            return res.status(200).json({
              msg: 'login was successful',
              redirect: '/info',
              userName: findUser.name,
              cookie: req.headers.cookie,
            });
            
          } else {
            return res.status(200).json({
              msg: 'Sai email hoặc mật khẩu',
            });
          }
        } else {
          return res.status(200).json({
            msg: 'Sai email hoặc mật khẩu',
          })
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
    req.session.destroy(err => {
      if (err) {
        return res.json({
          msg: "Error: Destroy session",
          redirect : '/home'
        })
      }
    }); // destroy session

    res.clearCookie('sid');
    return res.status(200).json({
      msg: 'Logout successful',
      redirect: '/login',
    });
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

          if (result.affectedRows > 0) {
            req.session.userId = result.insertId;
            req.session.role = '0'; // default user

            return res.status(201).json({
              msg: 'Register Account Success',
              email: email,
              name: name
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

  // [POST] /updateInfo  : update name, telephone
  async updateUserInfo(req, res, next) {
    const {name, telephone} = req.body;

  }
}

// export default new userController();
module.exports = new userController();
