const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const {
  models: { User, Cart_item },
} = require('../models/');
const { where } = require('sequelize');

// bcrypt
const saltRounds = 10;
class userController {
  // [GET] /admin/all-user
  async getAllUser(req, res, next) {
    try {
      const getUsers = await User.findAll({
        attributes: ['id', 'name', 'telephone', 'role'],
        where: {
          role: 0,
        },
      });
      if (getUsers) {
        return res.status(200).send(getUsers);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // [POST] /admin/delete-user
  async deleteUser(req, res, next) {
    const {id} = req.body;
    if (!id) {
      return res.status(400).json({
        msg: "Bad request!"
      })
    } else {
      const query = await User.destroy({
        where: {
          id,
        },
      })
        .then((data) => {
          console.log(data);
          if (data == 1) {
            return res.status(200).json({
              success: 'Deleted Success!',
            });
          } else {
            return res.status(400).json({
              success: "You can't delete this order!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    }
  }

  // [GET] /info
  async getInfo(req, res, next) {
    // check whether or not login
    console.log(req.session);
    let id = req.session.userId;
    const findUser = await User.findOne({
      attributes: ['name', 'role', 'email', 'telephone'],
      where: {
        id,
      },
    });

    return res.status(200).json({
      userId: id,
      userName: findUser.name,
      email: findUser.email,
      telephone: findUser.telephone,
      role: findUser.role,
    });
  }

  // [GET] /login
  getLoginPage(req, res, next) {
    return res.status(200).send('Hello, Please fill login form');
  }

  // [POST] /login
  async login(req, res, next) {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const hashedPwd = await bcrypt.hash(password, saltRounds);
        const findUser = await User.findOne({
          attributes: ['id', 'password', 'name', 'role', 'telephone'],
          where: { email },
        });

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
              email: email,
              role: findUser.role,
              cookie: req.headers.cookie,
              telephone: findUser.telephone,
            });
          } else {
            return res.status(200).json({
              msg: 'Sai email hoặc mật khẩu',
            });
          }
        } else {
          return res.status(200).json({
            msg: 'Sai email hoặc mật khẩu',
          });
        }
      } catch (error) {
        next(error);
      }
    } else {
      return res.status(400).json({
        msg: 'All filled must be required ',
      });
    }
  }

  // [POST] /logout
  async logout(req, res, next) {
    // store session cart in DB
    var cart = req.session.cart;
    if (cart) {
      var user_id, product_id, quantity;
      for (let i = 0; i < cart.length; i++) {
        user_id = cart[i].user_id;
        product_id = cart[i].product_id;
        quantity = cart[i].quantity;

        const checkCartExist = await Cart_item.findOne({
          where: { user_id, product_id },
        });

        if (checkCartExist) {
          if (checkCartExist.quantity != quantity) {
            Cart_item.update({ quantity }, { where: { user_id, product_id } });
            console.log('update');
          } else {
            console.log('nothing changes!');
          }
        } else {
          Cart_item.create({
            user_id,
            product_id,
            quantity,
          });
          console.log('create');
        }
      }
    }
    // destroy session
    req.session.destroy((err) => {
      if (err) {
        return res.json({
          msg: 'Error: Destroy session',
          redirect: '/home',
        });
      }
    }); // destroy session

    res.clearCookie('sid');
    return res.status(200).json({
      msg: 'Logout was successful',
      redirect: '/login',
    });
  }

  // [POST] /register
  async register(req, res, next) {
    const defaultUserRole = 0;
    const { email, password, name, telephone } = req.body;
    try {
      if (!email || !password || !name) {
        res.status(400).json({
          msg: 'Please fill email, password, name',
        });
      } else {
        const check_email_Exist = await User.findOne({ where: { email } });
        if (!check_email_Exist) {
          //Encrypt password with bcrypt
          const hashedPwd = await bcrypt.hash(password, saltRounds);
          if (!hashedPwd) {
            throw new Error('Error hashing pw');
          }

          await User.create({
            email,
            password: hashedPwd,
            name,
            telephone,
          })
            .then((data) => {
              console.log(data.id); // user id
              req.session.userId = data.id;
              req.session.role = defaultUserRole; // default user
              return res.status(201).json({
                msg: 'Register Account Success',
                email: email,
                userName: name,
                role: defaultUserRole,
                telephone,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.status(200).json({
            msg: 'Email đã tồn tại',
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // [POST] /updateInfo  : update name, telephone
  async updateUserInfo(req, res, next) {
    const { name, telephone } = req.body;

    if (!name && !telephone) {
      return res.status(400).json({
        msg: 'Nothing changes',
      });
    } else {
      // check if name or telephone value is null
      // need to update what
      const result = await User.update(
        { name, telephone },
        {
          where: {
            id: req.session.userId,
          },
        },
      )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    }

    return res.status(200).json({
      msg: 'Update success! ',
    });
  }

  // [POST] /updatePassword  : change password
  async updatePassword(req, res, next) {
    const { oldPW, newPW } = req.body;

    if (!oldPW && !newPW) {
      return res.status(200).json({
        msg: 'Bad request! ',
      });
    } else {
      // check coincidence
      if (oldPW === newPW) {
        return res.status(200).json({
          msg: 'Mật khẩu mới không được giống mật khẩu cũ',
        });
      }
      // check oldPW
      const getPW = await User.findOne({
        attributes: ['password'],
        where: {
          id: req.session.userId,
        },
      });
      const checkOldPW = await bcrypt.compareSync(oldPW, getPW.password);

      if (!checkOldPW) {
        return res.status(200).json({
          msg: 'Mật khẩu cũ không đúng',
        });
      }

      // create hashedPW
      const hashedPwd = await bcrypt.hash(newPW, saltRounds);
      if (!hashedPwd) {
        throw new Error('Error hashing pw');
      }

      const result = await User.update(
        { password: hashedPwd },
        {
          where: {
            id: req.session.userId,
          },
        },
      )
        .then((data) => {
          console.log(data);
          return res.status(200).json({
            msg: 'Đổi mật khẩu thành công!',
          });
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    }
  }
}

// export default new userController();
module.exports = new userController();
