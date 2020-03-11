const mongoose = require('mongoose');

const School = require('../models/school/School');

module.exports = (req, res, next) => {
  School.findById(mongoose.Types.ObjectId(req.session.school._id), (err, school) => {
    if (err || !school) return res.redirect('/auth/school/login');

    if (school.verified)
      return next();
    else
      return res.redirect('/auth/school/verify');
  });
};
