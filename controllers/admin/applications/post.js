const mongoose = require('mongoose');

const School = require('../../../models/school/School');

module.exports = (req, res) => {
  if (req.query && req.query.id && req.query.response) {
    if (req.query.response == 'accepted') {
      School.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
        "verified": true
      }}, {}, err => {
        if (err) return res.redirect('/');

        return res.redirect('/admin/applications');
      });
    } else {
      School.findByIdAndDelete(mongoose.Types.ObjectId(req.query.id), err => {
        if (err) return res.redirect('/');

        return res.redirect('/admin/applications');
      });
    }
  } else {
    return res.redirect('/');
  }
}
