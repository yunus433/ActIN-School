const mongoose = require('mongoose');

const School = require('../models/school/school');

module.exports = (req, res, next) => {
  if (req.session && req.session.school) {
    School.findById(mongoose.Types.ObjectId(req.session.school._id), (err, school) => {
      if (err || !school) return next();
      req.session.school = school;
      next();
    });
  } else {
    req.session.redirect = req.originalUrl;
    res.redirect('/auth/school/login');
  };
};
