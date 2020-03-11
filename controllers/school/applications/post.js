const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const School = require('../../../models/school/School');

module.exports = (req, res) => {
  if (req.query && req.query.id && req.query.response) {
    if (req.query.response == 'accepted') {
      User.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(req.query.id),
        "school": req.session.school._id
      }, {$set: {
        verified: true
      }}, {}, (err, user) => {
        if (err || !user) return res.redirect('/');

        School.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.school._id), {
          $pull: {
            "users": {
              "_id": req.query.id
            }
          },
          $push: {
            "users": {
              "_id": user._id,
              "name": user.name,
              "email": user.email,
              "createdAt": user.createdAt,
              "profilePhoto": user.profilePhoto
            }
          }
        }, {upsert: true}, (err, school) => {
          if (err || !school) return res.redirect('/');

          return res.redirect('/school/applications');
        });
      });
    } else {
      User.findOneAndDelete({
        "_id": mongoose.Types.ObjectId(req.query.id),
        "school": req.session.school._id
      }, (err, user) => {
        if (err || !user) return res.redirect('/');

        School.findByIdAndUpdate(mongoose.Types.ObjectId(req.session.school._id), {
          $pull: {
            "users": {
              "_id": req.query.id
            }
          }
        }, {upsert: true}, (err, school) => {
          if (err || !school) return res.redirect('/');

          return res.redirect('/school/applications');
        });
      });
    }
  } else {
    return res.redirect('/');
  }
}
