const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const School = require('../../../models/school/School');

const deleteStudent = (id, school) => {
  User.findOneAndDelete({
    "_id": mongoose.Types.ObjectId(id),
    "school": school._id
  }, (err, user) => {
    School.findByIdAndUpdate(mongoose.Types.ObjectId(school._id), {
      $pull: {
        "users": {
          "_id": id
        }
      }
    }, {upsert: true}, (err, school) => {
      return;
    });
  });
}

module.exports = (req, res) => {
  if (req.body && req.body.students) {
    req.body.students.forEach(student => {
      deleteStudent(student, req.session.school);
    });
    return res.sendStatus(200);
  } else {
    return res.sendStatus(500);
  }
}
