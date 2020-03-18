const validator = require('validator');
const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const School = require('../../../models/school/School');

const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    const newUserData = {
      email: req.body.email,
      name: req.body.name,
      school: req.body.school,
      schoolNumber: req.body.schoolNumber,
      password: req.body.password
    };

    const newUser = new User(newUserData);

    newUser.save((err, user) => {
      if (err && err.code == 11000) {
        req.session.error = 'already taken email';
        return res.redirect('/auth/register');
      }
      if (err) return res.redirect('/');

      School.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.school), {$push: {
        "applications": {
          _id: user._id.toString(),
          email: req.body.email,
          name: req.body.name,
          schoolNumber: req.body.schoolNumber,
          createdAt: user.createdAt
        }
      }}, {}, (err, school) => {
        if (err) return res.redirect('/');

        sendMail({
          email: user.email,
          name: user.name 
        }, 'userRegister', () => {
          req.session.user = user;
  
          return res.redirect('/auth/verify');
        });
      });
    });
  } else {
    req.session.error = 'not valid email';
    return res.redirect('/auth/register');
  }
}
