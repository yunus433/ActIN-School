const mongoose = require('mongoose');

const User = require('../models/user/User');

module.exports = (req, res, next) => {
  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/auth/login');

    if (user.verified)
      return next();
    else
      return res.redirect('/auth/verify');
  });
};
