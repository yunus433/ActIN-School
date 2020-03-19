const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const School = require('../../../models/school/School');

const updateStudent = (id, response, school) => {
  if (response == 'accept') {
    User.findOneAndUpdate({
      "_id": mongoose.Types.ObjectId(id),
      "school": school._id
    }, {$set: {
      verified: true
    }}, {}, (err, user) => {
      School.findByIdAndUpdate(mongoose.Types.ObjectId(school._id), {
        $pull: {
          "applications": {
            "_id": id
          }
        },
        $push: {
          "users": {
            "_id": id,
            "name": user.name,
            "schoolNumber": user.schoolNumber,
            "email": user.email,
            "createdAt": user.createdAt,
            "profilePhoto": user.profilePhoto
          }
        }
      }, {}, (err, school) => {
        return;
      });
    });
  } else {
    User.findOneAndDelete({
      "_id": mongoose.Types.ObjectId(id),
      "school": school._id
    }, (err, user) => {
      School.findByIdAndUpdate(mongoose.Types.ObjectId(school._id), {
        $pull: {
          "applications": {
            "_id": id
          }
        }
      }, {upsert: true}, (err, school) => {
        return;
      });
    });
  }
}

module.exports = (req, res) => {
  if (req.body && req.body.students && req.body.response) {
    req.body.students.forEach(student => {
      updateStudent(student, req.body.response, req.session.school);
    });
    return res.sendStatus(200);
  } else {
    return res.sendStatus(500);
  }
}
