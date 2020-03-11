const mongoose = require('mongoose');

const School = require('../models/school/School');

module.exports = (req, res, next) => {
  if (req.session && req.session.school) {
    School.findById(mongoose.Types.ObjectId(req.session.school._id), (err, school) => {
      if (err || !school) return res.redirect('/auth/school/login');
      req.session.school = school;
      next();
    });
  } else {
    req.session.redirect = req.originalUrl;
    return res.redirect('/auth/school/login');
  };
};
