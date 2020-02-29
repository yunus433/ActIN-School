const validator = require('validator');

const User = require('../../../models/user/User');
// const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    const newUserData = {
      email: req.body.email,
      name: req.body.name,
      school: req.body.school,
      password: req.body.password
    };

    const newUser = new User(newUserData);

    newUser.save((err, user) => {
      if (err && err.code == 11000) {
        req.session.error = 'already taken email';
        return res.redirect('/auth/register');
      }
      if (err) return res.redirect('/');

      // sendMail({
      //   email: user.email,
      //   userId: user._id 
      // }, 'userRegister', () => {
      //   req.session.notVerifiedUser = user;

      //   return res.redirect('/auth/verify');
      // });
      return res.redirect('/auth/login');
    });
  } else {
    req.session.error = 'not valid email';
    return res.redirect('/auth/register');
  }
}
