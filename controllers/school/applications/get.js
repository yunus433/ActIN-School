const mongoose = require('mongoose');

const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.findById(mongoose.Types.ObjectId(req.session.school._id), (err, school) => {
    if (err) return res.redirect('/');

    return res.render('school/applications', {
      page: 'school/applications',
      title: 'Öğrenci Başvuruları',
      includes: {
        external: ["css", "console", "school", "js", "fontawesome"]
      },
      school,
      "active": "applications"
    });
  });
}
